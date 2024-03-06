
"use client"
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";

export default function PagamentoPix() {

    initMercadoPago(process.env.TOKEN_TEST_MERCADOPAGO_PUBLIC! , { locale: 'pt-BR' });
    return (
      <div className="w-[550px] my-2 mx-auto">
          <h1>Pagina de Pagamento Pix</h1>
            <p>
            <CardPayment
                initialization={{ amount: 100 }}
                onSubmit={async (param:any) => {
                    console.log(param);
                }}
            />
            </p>
        </div>
    )
  }