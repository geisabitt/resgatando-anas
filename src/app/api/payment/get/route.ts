import { formatPaymentStatus, formatPaymentType } from "@/lib/formatters";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (id) {
            const payments = await prisma.paymentUser.findMany({
                where: { userId: id },
                select: {
                    id: true,
                    userId: true,
                    paymentId: true,
                    paymentStatus: true,
                    paymentType: true,
                    paymentDescription: true,
                    createdAt: true,
                }
            });

            const formattedPayments = payments.map(payment => {
                const formattedType = formatPaymentType(payment.paymentType);
                let formattedStatus = formatPaymentStatus(payment.paymentStatus);

                const createdAt = new Date(payment.createdAt);
                const now = new Date();
                const diffInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60);

                if (diffInHours > 30 && formattedType === 'Pix' && formattedStatus !== 'Aprovado') {
                    formattedStatus = 'Cancelado';
                }
                return { ...payment, paymentType: formattedType, paymentStatus: formattedStatus };
            });

            return NextResponse.json({ payments: formattedPayments, status: 200 });
        }

        return NextResponse.json({ message: 'Usuário ou pagamento não encontrados', status: 400 });
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao processar a solicitação', status: 500 });
    }
}
