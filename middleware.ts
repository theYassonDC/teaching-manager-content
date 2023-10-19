import { NextRequest, NextResponse } from 'next/server';
import globalConfig from './global.config';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = !!req.cookies.get(globalConfig.cookies)

  if (!session) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }
  return NextResponse.next();
}
// "/api/degrees/:path*"
export const config = { matcher: ["/dashboard/:path*"] };