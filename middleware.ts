import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // '/',
  ],
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const origin = req.headers.get('origin');
  console.log('origin :', origin);
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  // res.headers.set(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, Authorization'
  // );
  res.headers.set('Access-Control-Max-Age', '77777');

  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}
