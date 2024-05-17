
"use client"
import { HeaderColumn } from "@/components/shared/header-column/header-column";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { BsCreditCard2Back } from "react-icons/bs";

export default function PagamentoCartao() {

    initMercadoPago(process.env.TOKEN_TEST_MERCADOPAGO_PUBLIC! , { locale: 'pt-BR' });
    return (
      <div className="w-[550px] my-2 mx-auto">
          <HeaderColumn icon={BsCreditCard2Back} text="Efetuar pagamento via cartão de crédito"/>
            <p>
            <CardPayment
                initialization={{ amount: 250 }}
                onSubmit={async (param:any) => {
                    console.log(param);
                }}
            />
            </p>
        </div>
    )
  }