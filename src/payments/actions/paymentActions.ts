import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';


import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import  AuthService  from '../../auth/service/authService'
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago(process.env.TOKEN_TEST_MERCADOPAGO_PUBLIC! , { locale: 'pt-BR' });

const prisma = new PrismaClient();

async function createPaymentPix(){
    'use server';

    const userId = String(await AuthService.getUserId());
    const user = await prisma.users.findFirst({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                telefone: true,
                type: true,
            }
    });
 if (user){
    const name = user.name;
    const email = user.email;
    const phone = user.telefone;
    const description = 'Retiro Resgatando Anas 2024';
    const payment_method_id = 'pix';
    const transaction_amount = 180;
    const installments = 1;

    const paymentCreateRequest: PaymentCreateRequest = {
        description,
        payment_method_id,
        transaction_amount,
        installments,
        payer:{
            email,
            first_name: name,
            phone:{
                number: `${phone}`,
            },
        },
    }
    const idempotencyKey = uuidv4();
    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_TEST_MERCADOPAGO!, options: { timeout: 5000, idempotencyKey: idempotencyKey } });
    const payment = new Payment(client);

    const response = await payment.create({ body: paymentCreateRequest });
    const { id } = response;

    await prisma.paymentUser.create({
        data: {
            userId,
            paymentId: String(id),
        },
    });
    redirect(`/retiro/pagamento/pix/${id}`);
}

}

async function initPublicMercadoPago(){
   return initMercadoPago(process.env.TOKEN_TEST_MERCADOPAGO_PUBLIC! , { locale: 'pt-BR' });
}

async function createPaymentCard(formData: FormData){

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const description = formData.get('description') as string;
    const payment_method_id = formData.get('payment_method_id') as string;
    const transaction_amount = parseFloat(formData.get('transaction_amount') as string);
    const installments = formData.get('installments') as unknown as number;

    const paymentCreateRequest: PaymentCreateRequest = {
        description,
        payment_method_id,
        transaction_amount,
        installments,
        payer:{
            email,
            first_name: name,
            phone:{
                number: phone,
            },
        },
    }
    const idempotencyKey = uuidv4();
    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_TEST_MERCADOPAGO!, options: { timeout: 5000, idempotencyKey: idempotencyKey } });
    const payment = new Payment(client);

    const response = await payment.create({ body: paymentCreateRequest });
    const { id } = response;

    const userId = String(await AuthService.getUserId());
    await prisma.paymentUser.create({
        data: {
            userId,
            paymentId: String(id),
        },
    });

    redirect(`/pagamento/pix/sucess/${id}`);

}


const PaymentActions = {
    createPaymentPix,
    createPaymentCard,
    initPublicMercadoPago
}



export default PaymentActions

