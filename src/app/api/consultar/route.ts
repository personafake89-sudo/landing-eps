import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

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

export async function GET(req: NextRequest) {
  const codigo = req.nextUrl.searchParams.get('codigo')?.trim();

  if (!codigo) {
    return NextResponse.json({ error: 'Ingrese un código de cliente' }, { status: 400 });
  }

  const clientes = cargarClientes();
  const cliente = clientes.find(c => c.codcliente === codigo);

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
