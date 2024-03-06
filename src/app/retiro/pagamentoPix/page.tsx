import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import { FormPaymentPix } from "@/payments/components/formPaymentPix";
import { initMercadoPago } from "@mercadopago/sdk-react";

export default function PagamentoPix() {

  initMercadoPago(process.env.TOKEN_TEST_MERCADOPAGO_PUBLIC!, { locale: 'pt-BR' });
  return (
    <Card className="w-[550px] my-2 mx-auto">
      <CardHeader>
        <CardTitle>Pagina de Pagamento Pix</CardTitle>
      </CardHeader>
      <CardContent>
        <FormPaymentPix/>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
      <Link href='statusOk' className="bg-success p2 rounded-[0.3rem] text-center">Pagamento Confirmado</Link>
      <Link href='statusBad' className="bg-destructive p2 rounded-[0.3rem] text-center">Erro de paragemto</Link>
      </CardFooter>
      </Card>
  )
}