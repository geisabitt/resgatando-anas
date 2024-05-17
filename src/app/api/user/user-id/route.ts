import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
//import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

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
            return console.log(user)
            //return redirect(`/`)
        }
    }
    return console.log('nao foi encontrado um usuario')
    //return NextResponse.redirect(new URL('/', req.url));
}
