'use client'
import { useState } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { HeaderColumn } from "@/components/shared/header-column/header-column";
import { useRouter } from "next/navigation";
import './style.css'

export default function PagamentoCartao() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mp/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ valor: 250 })
      });

      const data = await response.json();

      if (data.initPoint) {
        router.push(data.initPoint);
        //window.location.href = data.initPoint;
      } else {
        console.error('Erro ao criar a preferência de pagamento:', data.error);
      }
    } catch (error) {
      console.error('Erro ao processar o pagamento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <HeaderColumn icon={BsCreditCard2Back} iconSize={45} text="Efetuar pagamento via cartão de crédito" />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processando...' : 'Pagar'}
      </button>
    </div>
  );
}
