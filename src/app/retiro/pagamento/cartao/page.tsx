import { BsCreditCard2Back } from "react-icons/bs";
import { HeaderColumn } from "@/components/shared/header-column/header-column";
import FormPagamentoCartao from "@/payments/components/mp-form-card-payment/mp-form-card-payment";
import './style.css'
export default function PagamentoCartao() {

    return (
      <div className="w-full">
        <HeaderColumn icon={BsCreditCard2Back} iconSize={45} text="Efetuar pagamento via cartão de crédito"/>
        <FormPagamentoCartao/>
      </div>
    )
  }