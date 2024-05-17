async function getInfoPayment(id:number) {
    'use server'
  
  const DATA_SOURCE_URL = 'https://api.mercadopago.com/v1/payments/';
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN_TEST_MERCADOPAGO;
  
  function extractUserPaymentDetails(data: any): UserPaymentDetails {
      return {
       detail:  {id: data.id,
        issuer_id: data.issuer_id,
        payment_method_id: data.payment_method_id,
        payment_type_id: data.payment_type_id,
        status: data.status,
        status_detail: data.status_detail,
        description: data.description,
        installments: data.installments,
        transaction_amount: data.transaction_amount,
        qr_code: data.point_of_interaction?.transaction_data?.qr_code,
        ticket_url: data.point_of_interaction?.transaction_data?.ticket_url,
        qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64,}
      };
    }
  
    const paymentUrl = `${DATA_SOURCE_URL}${id}`
    const res = await fetch(paymentUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });
  
    const uniquePayment = await res.json();
  
    const userPaymentDetails = extractUserPaymentDetails(uniquePayment);
  
    return userPaymentDetails;
  }
  
  const ServicePayment = {
      getInfoPayment
  }
  
  export default ServicePayment