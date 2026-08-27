import { NextRequest, NextResponse } from 'next/server';
import { blockIP, unblockIP, getBlockedIPs, getTopRequesters } from '@/lib/anti-spam';

export async function GET() {
  const blocked = getBlockedIPs();
  const topRequesters = getTopRequesters(20);

  return NextResponse.json({
    blocked,
    topRequesters,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, ip } = body;

  if (!action || !ip) {
    return NextResponse.json({ error: 'Faltan campos: action, ip' }, { status: 400 });
  }

  if (action === 'block') {
    blockIP(ip);
    return NextResponse.json({ success: true, message: `IP ${ip} bloqueada` });
  }

  if (action === 'unblock') {
    unblockIP(ip);
    return NextResponse.json({ success: true, message: `IP ${ip} desbloqueada` });
  }

  return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
}
