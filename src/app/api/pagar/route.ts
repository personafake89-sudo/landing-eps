import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type PagoPayload = {
  codcliente: string;
  nombre: string;
  monto: number;
  numTarjeta: string;
  titular: string;
  vencimiento: string;
};

const CSV_PATH = path.join(process.cwd(), 'pagos_log.csv');
const CSV_HEADER = 'fecha,codigo_cliente,nombre,monto,tarjeta,titular,vencimiento,estado,nro_operacion\n';

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
  // Tarjetas de prueba conocidas → siempre aprobadas
  const aprobadas = ['4111111111111111', '4242424242424242', '5500005555555559', '5105105105105100'];
  // Tarjetas de prueba de rechazo
  const rechazadas = ['4000000000000002', '4000000000009995', '4000000000000069'];

  if (aprobadas.includes(n)) return { exitoso: true };
  if (rechazadas.includes(n)) return { exitoso: false, motivo: 'Tarjeta rechazada por el banco' };

  // Para cualquier otra tarjeta de 16 dígitos válida en test → aprobar
  if (n.length >= 15) return { exitoso: true };
  return { exitoso: false, motivo: 'Número de tarjeta inválido' };
}

export async function POST(req: NextRequest) {
  let body: PagoPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const { codcliente, nombre, monto, numTarjeta, titular, vencimiento } = body;

  if (!codcliente || !monto || !numTarjeta || !titular || !vencimiento) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  // Simular procesamiento (300ms)
  await new Promise(r => setTimeout(r, 300));

  const resultado = simularPago(numTarjeta);
  const nroOperacion = `OP-${Date.now().toString().slice(-8)}`;
  const fecha = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
  const tarjetaMask = maskCard(numTarjeta);
  const estado = resultado.exitoso ? 'EXITOSO' : 'RECHAZADO';

  // Registrar en CSV
  try {
    inicializarCSV();
    const fila = [
      escaparCSV(fecha),
      escaparCSV(codcliente),
      escaparCSV(nombre),
      escaparCSV(monto.toFixed(2)),
      escaparCSV(tarjetaMask),
      escaparCSV(titular),
      escaparCSV(vencimiento),
      escaparCSV(estado),
      escaparCSV(nroOperacion),
    ].join(',') + '\n';

    fs.appendFileSync(CSV_PATH, fila, 'utf-8');
  } catch (e) {
    console.error('Error al escribir CSV:', e);
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
