import { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

export async function POST (req: NextRequest){
    const newPayment = await req.json()
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_TEST_MERCADOPAGO;
    if (!ACCESS_TOKEN) {
        Response.json({ status: 403, error: 'Não Foi possivel se conectar ao MercadoPago, tente novamente' });
        return;
    }

    const idempotencyKey = uuidv4();
    const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: idempotencyKey } });
    const payment = new Payment(client);

    try {
        console.log(newPayment)
        return Response.json({ message: 'Dados de pagamento recebidos com sucesso', status: 201, newPayment});
    } catch (error) {
            console.error(error)
            return Response.json({
                message: `Erro ao Pegar os dados do pagamento`,
                status: 400,
                error
            });
    }
}