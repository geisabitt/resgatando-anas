// api/user/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/auth/service/authService";

export async function GET(req: NextRequest) {
  // Remover a sessão
  const response = NextResponse.redirect(new URL('/retiro/login', req.url));

  // Garantir que o cookie está sendo removido no caminho correto
  response.cookies.set('session', '', {
    path: '/',
    expires: new Date(0),  // Define a expiração do cookie para uma data passada
    httpOnly: true,  // Mesmo atributo definido no cookie de criação
  });

  return response;
}
