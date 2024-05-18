'use client'
import { useState } from 'react';
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import './mp-form-card-payment.css';

export default function FormPagamentoCartao() {

  initMercadoPago('TEST-3d6b9fa7-f9f1-42bb-abf2-346829e60be9', { locale: 'pt-BR' });

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

    const paymentData = {
        token: param.token,
        description: 'Retiro Resgatando Anas 2024',
        transactionAmount: 250,
        installments: 1,
        paymentMethodId: param.payment_method_id,
        issuer: param.issuer_id,
        payer: {
            email: param.payer.email,
            identificationType: param.payer.identification.type,
            identificationNumber: param.payer.identification.number,
        },
    };
    console.log('Dados do pagamento no front-end:', paymentData);

    try {
      const response = await fetch('/api/mp/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao processar o pagamento');
      }

      const result = await response.json();
      console.log('Pagamento concluído:', result);
      alert('Pagamento concluído');
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
        initialization={{ amount: 250 }}
        onSubmit={handleSubmit}
      />
      {loading && <p>Processando pagamento...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}