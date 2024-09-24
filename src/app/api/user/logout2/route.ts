// api/user/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/auth/service/authService";

export async function GET(req: NextRequest) {

  const response = NextResponse.redirect(new URL('/retiro/login', req.url));

  try {
    await AuthService.destroySession2()
    const isValidSession = await AuthService.isSessionValid();
    if (isValidSession) {
      return NextResponse.redirect(new URL('/user', req.url));
    } else {
      return response;
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/retiro/login', req.url));
  }
}
