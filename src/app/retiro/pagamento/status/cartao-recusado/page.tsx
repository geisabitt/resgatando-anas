'use client'
import { Card, CardContent, CardFooter} from "@/components/ui/card"
import { BsEmojiFrown  } from "react-icons/bs";

import { HeaderColumn } from "@/components/shared/header-column/header-column";
import ButtonLink from "@/components/shared/button-link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();

    useEffect(() => {
      const statusParam = searchParams.get('status');
      const paymentIdParam = searchParams.get('payment_id');
      const paymentType = searchParams.get('payment_type');
  
      const statuses = statusParam ? statusParam.split(',') : [];
      const paymentIds = paymentIdParam ? paymentIdParam.split(',') : [];
  
      statuses.forEach((status, index) => {
        const paymentId = paymentIds[index];
  
        if (status && paymentId) {
          createPayment({ status, paymentId, paymentType });
        }
      });
    }, [searchParams]);
  
    const createPayment = async (queryParams: any) => {
      try {
        const response = await fetch('/api/payment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: queryParams.paymentId,
            paymentStatus: queryParams.status,
            paymentType: queryParams.paymentType,
            paymentDescription: "Retiro de mulheres 2024",
          }),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log('Pagamento criado com sucesso:', data);
        } else {
          console.error('Erro ao criar o pagamento:', data.message);
        }
      } catch (error) {
        console.error('Erro ao conectar com o back-end:', error);
      }
    };
  

return (
    <Card className="w-[98%] max-w-[380px] flex flex-col gap-2 my-2 mx-auto border-0">
        <HeaderColumn icon={BsEmojiFrown} iconColor="text-red300" text={"Pagamento recusado!"} textBold={true} />
    <CardContent>
        <p className="">Não foi possível concluir o pagamento com esse cartão. Verifique as informações do seu cartão e tente novamente.</p>
    </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
        <ButtonLink btnText={"Voltar para formas de pagamento"} btnColor="bg-blue500" btnClass="text-white" btnLink={"/retiro/pagamento"}/>
            <h6 className="mt-4 font-bold">Mais informações entre em contato com o suporte :</h6>
            <p className="w-full">
                <p className="mt-2 flex justify-between text-gray-600">Pra. Roberta: <span>(21) 97026-1802</span></p>
                <p className="flex justify-between text-gray-600">Pra. Glória: <span>(21) 97068-6842</span></p>
                <p className="mt-2 font-bold text-gray-600">Informações adicionais:</p>
                <p className="flex justify-between text-gray-600">Diac. Camila: <span>(21) 99363-6957</span></p>
            </p>
            <ButtonLink btnText={"Voltar para Minha Conta"} btnClass="text-white" btnLink={"/user"}/>
    </CardFooter>
    </Card>
    )
}