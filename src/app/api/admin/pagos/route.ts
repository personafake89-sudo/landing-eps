import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Sin base de datos configurada' }, { status: 500 });
  }

  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`
    SELECT id, fecha, codigo_cliente, nombre, monto, tarjeta, titular, vencimiento, estado, nro_operacion
    FROM pagos
    ORDER BY id DESC
    LIMIT 500
  `;

  return NextResponse.json(rows);
}
