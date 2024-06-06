import { NextRequest, NextResponse } from 'next/server';
import AuthService from './auth/service/authService';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|_next/img|foto-header.png).*)',
};

const publicRoutes = [
  '/',
  '/api/user/create',
  '/api/user/login',
  '/retiro/cadastro/dados-pessoais',
  '/retiro/login',
  // '/retiro/pagamento',
  // '/retiro/pagamentoPix',
  // '/retiro/statusOk',
  // '/retiro/statusBad',
  '/api/mp/payments',
];

const publicFolders = ['/img', '/videos'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname) || publicFolders.some(folder => pathname.startsWith(folder))) {
    return NextResponse.next();
  }

  // Verifique se a rota da API foi acessada
  const isApiPaymentRoute = pathname.startsWith('/api/mp/payments');

  // Se for a rota da API de pagamento, permita o acesso sem autenticação
  if (isApiPaymentRoute) {
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid();
  if (!session) {
    const isAPIRoute = pathname.startsWith('/api');

    if (isAPIRoute) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/retiro/login', req.url));
  }

  return NextResponse.next();
}