'use client'
import{ StatusScreen, initMercadoPago }from '@mercadopago/sdk-react'

export default function Pagamento() {

  initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83' , { locale: 'pt-BR' });

    const initialization = {
      paymentId: '1311946695',
    };
  return (
    <div className="flex align-center justify-center p-4">
    <StatusScreen initialization={initialization} />;
    </div>
  )
}