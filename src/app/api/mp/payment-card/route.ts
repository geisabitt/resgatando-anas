import { NextApiRequest, NextApiResponse } from 'next';
import MercadoPago, { Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_TEST_MERCADOPAGO;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (!ACCESS_TOKEN) {
        res.status(500).json({ error: 'ACCESS_TOKEN is not defined in the environment variables' });
        return;
    }

    let body;
    try {
        body = JSON.parse(req.body); // Parsing the request body manually
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    console.log('Corpo da requisição:', body);

    const idempotencyKey = uuidv4();
    const client = new MercadoPago({ accessToken: ACCESS_TOKEN, options: { timeout: 5000 } });
    const payment = new Payment(client);

    const paymentData = {
        token: body.token,
        transaction_amount: Number(body.transactionAmount),
        description: body.description,
        installments: Number(body.installments),
        payment_method_id: body.paymentMethodId,
        issuer_id: body.issuer,
        payer: {
            email: body.payer.email,
            identification: {
                type: body.payer.identification.type,
                number: body.payer.identification.number,
            },
        },
    };

    console.log('Dados do pagamento recebidos:', paymentData);

    try {
        const response = await payment.create({
            body: paymentData,
            requestOptions: {
                idempotencyKey: idempotencyKey,
            },
        });
        return NextResponse.json({
            status: response.status,
            status_detail: response.status_detail,
            id: response.id,
        }, { status: 201 });
    } catch (error: any) {
        console.error('Erro ao processar pagamento:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}