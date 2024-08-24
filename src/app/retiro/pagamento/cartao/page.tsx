'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
import { useState, useEffect } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { HeaderColumn } from "@/components/shared/header-column/header-column";
import './style.css';

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
    <div className="w-full">
      <Card className="w-[98%] max-w-[380px] flex flex-col gap-9 my-2 mx-auto border-0">
      <CardHeader className="flex flex-row gap-2">
      <Image src={'/img/LogoResgatandoAnas.png'} alt="alt" width={47} height={47} />
        <CardTitle><h5>Resgatando Anas</h5> <p>Descendo do salto</p></CardTitle>
      </CardHeader>
      <CardContent>
      <Card className="info p-2 my-2 mx-auto">
        <ul className="list-info flex flex-col gap-3">
          <li className="font-bold">Atenção</li>
          <li>Ao clicar no botão abaixo você será redirecionada para página de pagamento do mercado pago, onde além da opção de cartão de crédito, você também terá a opção de pagar com mercado pago e com o cartão de débito caixa.</li>
          <li>Tudo isso para facilitar a sua participação no retiro.</li>
        </ul>
      </Card>
      </CardContent>
          <div className="w-[98%] max-w-[380px] my-2 mx-auto flex flex-col items-center justify-center text-center">
        {loading ? (
          <div className="text-center">
            <p>Gerando link de pagamento</p>
            <p>Processando.....</p>
          </div>
        ) : (
          url ? (
            <a  className={`w-full`} href={url} target="_blank" rel="noopener noreferrer">
              <button className={`w-full py-4 rounded bg-success700 text-white`}>Ir para página de pagamento</button>
            </a>
          ) : (
            null
          )
        )}
      </div>
    </Card>
    </div>
  );
}
{/* <iframe
src={url}
style={{ width: '100%', height: '600px', border: 'none' }}
title="Mercado Pago Checkout"
/> */}