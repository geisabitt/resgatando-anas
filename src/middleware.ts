import { NextRequest, NextResponse } from 'next/server';
import AuthService from './auth/service/authService';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|_next/img|foto-header.png).*)',
};

const publicRoutes = ['/',
                      '/retiro/cadastro',
                      '/retiro/login',
                      '/retiro/pagamento',
                      '/retiro/pagamentoPix',
                      '/retiro/statusOk',
                      '/retiro/statusBad'
                      ];

const publicFolders = ['/img']; // Adicione a pasta 'img' aos recursos públicos

export async function middleware(req: NextRequest) {
  console.log(req.nextUrl);

  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname) || publicFolders.some(folder => pathname.startsWith(folder))) {
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