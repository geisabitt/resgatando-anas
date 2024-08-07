'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';
import './style.css';
import { Card, CardHeader, CardTitle } from "@/components/ui";

export default function PagamentoCartao() {
  const [url, setUrl] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePayment = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/mp/create-preference', {
          method: 'POST',
        });

        const data = await response.json();
        console.log(data)

        if (data.init_point) {
          console.log(data.init_point)
          setUrl(data.init_point);
        } else {
          console.error('Erro ao criar a preferência de pagamento:', data.error);
        }
      } catch (error) {
        console.error('Erro ao processar o pagamento:', error);
      } finally {
        setLoading(false);
      }
    };

    handlePayment();
  }, []);

  return (
    <div className="w-[90%] max-w-[380px] flex flex-col gap-6 my-2 mx-auto ">
      <CardHeader className="flex flex-row gap-2">
      <Image src={'/img/LogoResgatandoAnas.png'} alt="alt" width={47} height={47} />
        <CardTitle><h5>Resgatando Anas</h5> <p>Descendo do salto</p></CardTitle>
      </CardHeader>
      <div className="flex flex-col min-h-72 items-center">
      <Card className="w-full info p-2 my-6 mx-auto">
        <ul className="list-info flex flex-col gap-3">
            <li className="font-bold">Atenção</li>
            <li>Ao clicar no botão abaixo você será redirecionada para página de pagamento do mercado pago, onde além da opção de cartão de crédito, você também terá a opção de pagar com mercado pago e com o cartão de débito caixa.</li>
            <li>Tudo isso para facilitar a sua participação no retiro.</li>
          </ul>
      </Card>
        {loading ? (
          <div className="text-center">
            <p>Gerando link de pagamento</p>
            <p>Processando.....</p>
          </div>
        ) : (
          url ? (
            <a  className={`w-full`} href={url} target="_blank" rel="noopener noreferrer">
              <button className={`w-full py-4 rounded text-white font-bold bg-success700`}>Ir para pagina de pagamento</button>
            </a>
          ) : (
            null
          )
        )}
      </div>
    </div>
  );
}
{/* <iframe
src={url}
style={{ width: '100%', height: '600px', border: 'none' }}
title="Mercado Pago Checkout"
/> */}