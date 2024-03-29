import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /user/userId:
 *  get:
 *    desctiption: retorna o usuario
 *    responses:
 *      200:
 *        description: ok
 *      404:
 *        description: usuario não encontrado
 *      403:
 *        description: não autorizado
*/

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const id = await AuthService.creatRouteId();
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

        if (user) {
            return redirect(`/retiro/users/${id}`)
        }
    }
    return NextResponse.redirect(new URL('/', req.url));
}
