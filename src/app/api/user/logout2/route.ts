import AuthService from "@/auth/service/authService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await AuthService.destroySession();

    const isValidSession = await AuthService.isSessionValid();

    if (isValidSession) {
      return NextResponse.json(
        { message: "Erro ao deslogar. Tente novamente.", returnUrl: "/user" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Logout realizado com sucesso", returnUrl: "/retiro/login" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Erro durante o logout:", error);
    return NextResponse.json(
      { message: "Erro ao processar o logout", error: error },
      { status: 500 }
    );
  }
}
