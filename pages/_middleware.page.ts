import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const pathname = req.nextUrl.pathname;

  console.log('pathname', pathname);

  if (pathname === '/') {
    NextResponse.next();
  }
}
