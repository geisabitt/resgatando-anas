async function PaymentPix(formData:FormData) {
    'use server';

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const description = 'Retiro de Mulheres';
    const payment_method_id = 'pix';
    const transaction_amount = 280;
    const paymentType = 'bank_transfer';
    const selectedPaymentMethod = 'bank_transfer';

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

    const teste = await console.log(fetch('http://localhost:3001/api/mp/paymentPix'));
     
    

    return { transactionDetails, teste }

    }

const PaymentService = {
    PaymentPix
}

export default PaymentService