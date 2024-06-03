import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import MercadoPago, { Payment } from 'mercadopago'; // Certifique-se de importar corretamente
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest, res: NextResponse) {
    const newPayment = await req.json();
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_PROD_MERCADOPAGO;


    if (!ACCESS_TOKEN) {
        return Response.json({ status: 403, error: 'Não foi possível se conectar ao MercadoPago, tente novamente' });
    }

    const idempotencyKey = uuidv4();

    const client = new MercadoPago({ accessToken: ACCESS_TOKEN, options: { timeout: 5000 } });
    const payment = new Payment(client);

    try {
        console.log(newPayment);

        const paymentResponse = await payment.create({
            body: { ...newPayment },
            requestOptions: {
                idempotencyKey: idempotencyKey
            }
        });

        if(parseInt(paymentResponse.status!) !== 200){
                console.log(paymentResponse);
                return Response.json(paymentResponse);
        }else if(paymentResponse.status === "rejected"){
        return Response.json({ message: 'Pagamento Recusado', status: 4003, paymentResponse });
        }
        return Response.json({ message: 'Pagamento criado com sucesso', status: 201, paymentResponse });
    } catch (error) {
        console.error(error);
        return Response.json({
            message: 'Erro ao processar o pagamento',
            status: 400,
            error: error
        });
    }
}
