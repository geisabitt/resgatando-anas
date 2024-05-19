'use client'
import { useState } from 'react';
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import './mp-form-card-payment.css';

export default function FormPagamentoCartao() {

  initMercadoPago(process.env.TOKEN_PROD_MERCADOPAGO_PUBLIC!, { locale: 'pt-BR' });

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
        throw new Error(errorText || 'Erro ao processar o pagamento');
      }

      const result = await response.json();
      console.log('Resposta da api:', result);
      alert(`Codigo: ${result.status}, mensagem: ${result.message}`);
    } catch (error: any) {
      console.error('Erro no pagamento:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div>
      <CardPayment
        customization={customization}
        initialization={{ amount: 0.5 }}
        onSubmit={handleSubmit}
      />
      {loading && <p>Processando pagamento...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}