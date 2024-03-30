import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// /**
//  * @swagger
//  * /user/userId:
//  *  get:
//  *    sumary: Id User
//  *    desctiption: Verifica se o usuario existe no banco de dados, e que tipo de usuario ele é e redireciona para a pagina de usuario por id
//  *    tags: ['Usuario']
//  *    responses:
//  *      200:
//  *        description: ok return redirect(`/retiro/users/${id}`)
//  *      404:
//  *        description: usuario não encontrado
//  *      403:
//  *        description: não autorizado
// */

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
