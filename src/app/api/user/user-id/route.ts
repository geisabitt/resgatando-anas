import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const id = await AuthService.creatRouteId();
    console.log(id);

    if (id) {
        const user = await prisma.users.findFirst({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                telefone: true,
                type: true,
            }
        });

        if (user) {
            return Response.json({status: 201, user});
        }
    }
    return Response.json({ message: 'Usuario não encontrado', status: 400});
}
