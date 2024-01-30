import AuthService from "@/auth/service/auth-service";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const id = await AuthService.creatRouteId();

    console.log('id na rote de usuario', id);
    if (id) {
        const user = await prisma.users.findFirst({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                type: true,
            }
        });

        console.log('usuario vindo da rota', user);

        if (user) {
            return redirect(`/retiro/users/${id}`);
        }
    }
    return NextResponse.redirect(new URL('/', req.url))
}