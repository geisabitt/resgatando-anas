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

    const publicKey = 'TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83';
    if(publicKey) initMercadoPago(publicKey , { locale: 'pt-BR' });

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
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Pagina de agamento</CardTitle>
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
      <CardFooter className="flex justify-between">
      <Link href='statusOk' className={buttonVariants({variant:"outline"})}>Pagamento Confirmado</Link>
      <Link href='statusBad' className={buttonVariants({variant:"outline"})}>Erro de paragemto</Link>
     </CardFooter>
    </Card>
    </>
  )
}