import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const id = await AuthService.creatRouteId();
        console.log("ID",id);
        
        if (id) {
            const payment = await prisma.paymentUser.findMany({
                where: { userId: id },
                select: {
                    id:true,
                    userId:true,
                    paymentId:true,
                    paymentStatus:true,
                    paymentDescription:true,
                    createdAt:true,
                    }
                    });

            return Response.json({ payment, status: 200 });
        }

        return Response.json({ message: 'Usuário ou pagamento não encontrados', status: 400 });
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return Response.json({ message: 'Ocorreu um erro ao processar a solicitação', status: 500 });
    }
}