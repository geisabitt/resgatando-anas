import AuthService from "@/auth/service/auth-service";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    AuthService.destroySession();
    return NextResponse.redirect(new URL('/', req.url))
}