import { NextRequest, NextResponse } from 'next/server';
import AuthService from './auth/service/authService';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|_next/img|foto-header.png|img/.*).*)',
};

const publicRoutes = [
  '/',
  '/api/user/create',
  '/api/mp/getAllMethods',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/check-session',
  '/retiro/login',
  '/retiro/cadastro/dados-pessoais',
  '/nao-autorizado',
];

const publicFolders = ['/img', '/videos'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname) || publicFolders.some(folder => pathname.startsWith(folder))) {
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid();
  if (!session && !publicRoutes.includes(pathname)) {
    const isAPIRoute = pathname.startsWith('/api');

    if (isAPIRoute && !publicRoutes.includes(pathname)) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    return NextResponse.redirect(new URL('/retiro/login', req.url));
  }

  if (pathname.startsWith('/administracao')) {
    const sessionCookie = req.cookies.get('session');
    if (sessionCookie) {
      const { value: token } = sessionCookie;
      const payload = await AuthService.openSessionToken(token);

      if (payload?.type !== 'admin') {
        return NextResponse.redirect(new URL('/retiro/login', req.url));
      }
    } else {
      return NextResponse.redirect(new URL('/retiro/login', req.url));
    }
  }

  return NextResponse.next();
}