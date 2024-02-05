import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';
async function PaymentPix(formData: FormData): Promise<{ transactionDetails: TransactionDetails; result: any }> {
    'use server';

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const description = 'Retiro de Mulheres';
    const payment_method_id = 'pix';
    const transaction_amount = 280;
    const paymentType = 'bank_transfer';
    const selectedPaymentMethod = 'bank_transfer';

    const paymentCreateRequest: PaymentCreateRequest = {
        description,
        payment_method_id,
        payer:{
            email,
            phone:{
                number: phone,
            },
            first_name: name,
        },
        transaction_amount,
    }

    const transactionDetails: TransactionDetails = {
        name,
        email,
        phone,
        description,
        payment_method_id,
        transaction_amount,
        paymentType,
        selectedPaymentMethod
    };

    try {
        const response = await fetch('http://localhost:3000/api/mp/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transactionDetails }),
        });

        if (!response.ok) {
            console.error(`API call failed with status: ${response.status}`);
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`Failed to make the API call. Status: ${response.status}`);
        }

        const result = await response.json();

        return { transactionDetails, result };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to make the API call');
    }
}

const PaymentService = {
    PaymentPix,
};

export default PaymentService;
