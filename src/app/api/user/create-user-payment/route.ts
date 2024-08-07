import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import AuthService from "@/auth/service/authService";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { collection_status, payment_id, payment_type, merchant_order_id } = await req.json();
        
        if (collection_status !== 'approved') {
            return NextResponse.json({ message: 'Pagamento não aprovado', status: 400 });
        }

        const id = await AuthService.creatRouteId();

        const paymentPrisma = await prisma.paymentUser.create({
            data: {
                userId: id!,
                paymentId: payment_id!,
                paymentStatus: collection_status!,
                paymentType: payment_type!,
                paymentDescription: 'Retiro Resgatando Anas 2024',
                active: true,
            },
        });

        return NextResponse.json({ message: 'Pagamento criado com sucesso', status: 201, paymentPrisma });
    } catch (error:any) {
        console.error('Erro ao processar o pagamento:', error);
        return NextResponse.json({
            message: 'Erro ao processar o pagamento',
            status: 500,
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
}
