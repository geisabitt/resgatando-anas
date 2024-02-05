import { MercadoPagoConfig, Payment } from 'mercadopago';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_TEST_MERCADOPAGO!, options: { timeout: 5000 } });
    const payment = new Payment(client);
    try {
        const body = req.body as PaymentCreateRequest;
        console.log(body);

        const result = await payment.create({ body });
        console.log(result);

        NextResponse.json(result);
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    };