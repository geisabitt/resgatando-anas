import { MercadoPagoConfig, Payment } from 'mercadopago';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_TEST_MERCADOPAGO!, options: { timeout: 20000 } });
    const payment = new Payment(client);

    console.log("API Request Data", req.body);
    const body = await req.body as PaymentCreateRequest;
    try {
        // Imprimir apenas os dados recebidos

        console.log("Parsed Request Body", body);

        const result = await payment.create({ body });
        console.log("API Response", result);

        NextResponse.json({ message: body }, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: body }, { status: 500 });
    }
};
