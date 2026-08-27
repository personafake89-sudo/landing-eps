import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting (works in Edge Runtime)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests: number = 30, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Blocked IPs (loaded from env or hardcoded for quick blocking)
const BLOCKED_IPS = (process.env.BLOCKED_IPS || '').split(',').filter(Boolean);

function isIPBlocked(ip: string): boolean {
  return BLOCKED_IPS.includes(ip);
}

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const pathname = request.nextUrl.pathname;

  // Only apply to API routes
  if (pathname.startsWith('/api/')) {
    // Check if IP is blocked
    if (isIPBlocked(ip)) {
      return NextResponse.json(
        { error: 'Acceso denegado' },
        { status: 403 }
      );
    }

    // Rate limit: 30 requests per minute for consultations, 5 for payments
    const maxRequests = pathname.includes('/pagar') ? 5 : 30;
    if (!checkRateLimit(ip, maxRequests)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta más tarde.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
