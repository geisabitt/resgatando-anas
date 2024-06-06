'use client'
import { useEffect, useState } from 'react';
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { useRouter } from "next/navigation";
import './mp-form-card-payment.css';

export default function FormPagamentoCartao() {

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN_PROD_MERCADOPAGO_PUBLIC;
    if (token) {
      initMercadoPago(token, { locale: 'pt-BR' });
    } else {
      setError('Token de acesso do Mercado Pago não está disponível');
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const customization = {
    visual: {
      style: {
        customVariables: {
          inputBackgroundColor: '#FDF9FA',
          outlinePrimaryColor: '#F4E5E6',
          inputBorderWidth: '.063rem',
          baseColor: '#44AE82',
          baseColorSecondVariant: '#28674D',
        },
      },
      fontWeightSemiBold: true,
      hidePaymentButton: false,
    },
  };
  const router = useRouter();

  const handleSubmit = async (param: any) => {
    setLoading(true);
    setError(null);
    console.log('paramsssss', param)


    try {
      const response = await fetch('/api/mp/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });

      if (!response.ok) {
        const errorText = await response.text();
        router.push("/retiro/pagamento/status/cartao-recusado");
        // throw new Error(errorText || 'Erro ao processar o pagamento');
      }

      const result = await response.json();
      console.log('Resposta da api:', result);
      if(result.status !== "approved") {
      //alert(`Codigo: ${result.status}, mensagem: ${result.message}`);
      router.push("/retiro/pagamento/status/cartao-recusado");
      }else{
        router.push("/retiro/pagamento/status/aprovado");
      }
    } catch (error: any) {
      console.error('Erro no pagamento:', error);
      // setError(error.message);
      router.push("/retiro/pagamento/status/cartao-recusado");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className='w-[95%] p-2'>
      <CardPayment
        customization={customization}
        initialization={{ amount: 250 }}
        onSubmit={handleSubmit}
      />
      {/* {loading && <p>Processando pagamento...</p>}
      {error && <p>Error: {error}</p>} */}
    </div>
  );
}