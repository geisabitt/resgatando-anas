import AuthService from "@/auth/service/authService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await AuthService.destroySession();
    return NextResponse.redirect(new URL('/retiro/login', req.url))
}