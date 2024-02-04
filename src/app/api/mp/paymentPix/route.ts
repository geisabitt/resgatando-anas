import { MercadoPagoConfig, Payment } from 'mercadopago';
import PaymentService from '@/payments/services/paymentServices';

export function POST(){
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_TEST_MERCADOPAGO!, options: { timeout: 5000 } });

const payment = new Payment(client);

 return console.log('VEIO DA API', PaymentService);


// payment.create({ body: {
// 	transaction_amount: 12.34,
// 	description: '<DESCRIPTION>',
// 	payment_method_id: '<PAYMENT_METHOD_ID>',
// 	payer: {
// 		email: '<EMAIL>'
// 	},
// } }).then(console.log).catch(console.log);
}