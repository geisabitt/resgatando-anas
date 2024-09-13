import { PaymentUser, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/auth/service/authService";

const prisma = new PrismaClient();

export async function POST (req: NextRequest){
    const newPayment: Partial<PaymentUser> = await req.json()
    console.log('newPayment:', newPayment)

    const userId = String(await AuthService.getUserId());
    if (!userId) {
        return Response.json({ error: 'Não Foi Possivel Encontrar o Usúario', status: 400 });
    }

try {
    await prisma.paymentUser.create({
        data: {
            userId,
            paymentId: String(newPayment.id),
            paymentStatus: newPayment.paymentStatus!,
            paymentType: newPayment.paymentType!,
            paymentDescription: newPayment.paymentDescription!,
            active : true,
        },
    });

    if (newPayment.paymentStatus === "rejected") {
        return NextResponse.json({ message: 'Pagamento Recusado', status: 4003});
    } else {
        return NextResponse.json({ message: 'Pagamento criado com sucesso', status: 201});
    }
} catch (error) {
    console.error('Erro ao processar o pagamento:', error);
    return NextResponse.json({
        message: 'Erro ao processar o pagamento',
        status: 400,
        error: error
    });
} finally {
    await prisma.$disconnect();
}
}
