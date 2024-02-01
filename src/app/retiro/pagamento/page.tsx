'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import{ initMercadoPago }from '@mercadopago/sdk-react'
import{ Payment }from '@mercadopago/sdk-react'

export default function Pagamento() {

  initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83' , { locale: 'pt-BR' });

    const initialization = {
        amount: 280,
        preferenceId: '207446753-ea3adb2e-a4f2-41dd-a656-11cb01b8772c',
      };
    
      const customization = {
        paymentMethods: {
          bankTransfer: ['pix'],
          creditCard: 'all',
          debitCard: 'all'
        },
      };
  return (
    <>
        <Card className="w-[350px] my-2 mx-auto">
      <CardHeader>
        <CardTitle>Pagina de pagamento</CardTitle>
      </CardHeader>
      <CardContent>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={async (param) => {
            console.log(param);
        }}
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
      <Link href='statusOk' className="bg-success p2 rounded-[0.3rem] text-center">Pagamento Confirmado</Link>
      <Link href='statusBad' className="bg-destructive p2 rounded-[0.3rem] text-center">Erro de paragemto</Link>
     </CardFooter>
    </Card>
    </>
  )
}