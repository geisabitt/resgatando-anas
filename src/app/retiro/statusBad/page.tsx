'use client'
import{ StatusScreen, initMercadoPago }from '@mercadopago/sdk-react'

export default function Pagamento() {

    const publicKey = process.env.TOKEN_TEST_MERCADOPAGO_STATUSBAD;
    if(publicKey) initMercadoPago(publicKey , { locale: 'pt-BR' });

    const initialization = {
      paymentId: '1307907697',
    };
  return (
    <div className="flex align-center justify-center p-4">
    <StatusScreen initialization={initialization} onError={(error) => console.error(error)} />
    </div>
  )
}