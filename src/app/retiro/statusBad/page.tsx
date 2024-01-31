'use client'
import{ StatusScreen, initMercadoPago }from '@mercadopago/sdk-react'

export default function Pagamento() {

  initMercadoPago('TEST-2b00e5a0-b421-4588-b9cb-846a553d760e' , { locale: 'pt-BR' });

    const initialization = {
      paymentId: '1307907697',
    };
  return (
    <div className="flex align-center justify-center p-4">
    <StatusScreen initialization={initialization} onError={(error) => console.error(error)} />
    </div>
  )
}