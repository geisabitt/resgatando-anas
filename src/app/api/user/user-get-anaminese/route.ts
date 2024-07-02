import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const id = await AuthService.creatRouteId();

    if (id) {
        const data = await prisma.usersAnaminese.findFirst({
            where: { userId: id },
        });

        if (data) {
            return NextResponse.json({ status: 200, data });
        }
    }
    return NextResponse.json({ message: 'Dados não encontrados', status: 400 });
}
