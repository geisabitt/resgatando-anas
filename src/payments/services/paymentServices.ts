import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

async function PaymentPix(formData: FormData): Promise<{ paymentCreateRequest: PaymentCreateRequest; result: any }> {
    'use server';

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const description = formData.get('description') as string;
    const payment_method_id = formData.get('payment_method_id') as string;
    const transaction_amount = parseFloat(formData.get('transaction_amount') as string);

    const paymentCreateRequest: PaymentCreateRequest = {
        description,
        payment_method_id,
        transaction_amount,
        payer:{
            email,
            first_name: name,
            phone:{
                number: phone,
            },
        },
    }
    console.log("SERVICE LOG", paymentCreateRequest);
    

    try {
        const response = await fetch('http://localhost:3000/api/mp/payments', {
        //const response = await fetch('http://localhost:3000/api/mp/paymentHandle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentCreateRequest }),
        });

        if (!response.ok) {
            console.error(`API call failed with status: ${response.status}`);
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`Failed to make the API call. Status: ${response.status}`);
        }

        const result = await response.json();

        return { paymentCreateRequest, result };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to make the API call');
    }
}

const PaymentService = {
    PaymentPix,
};

export default PaymentService;
