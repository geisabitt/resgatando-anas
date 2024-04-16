'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
// import Link from 'next/link';

export default function Pagamento() {


  return (
    <Card className="w-[350px] my-2 mx-auto">
      <CardHeader>
      <Image src={'/img/LogoResgatandoAnas.png'} alt="alt" width={47} height={47} />
        <CardTitle><h5>Resgatando Anas</h5> <p>Descendo do salto</p></CardTitle>
      </CardHeader>
      <CardContent>


      </CardContent>
      <CardFooter className="flex justify-between gap-2">
      {/* <Link href='statusOk' className="bg-success p2 rounded-[0.3rem] text-center">Pagamento Confirmado</Link>
      <Link href='statusBad' className="bg-destructive p2 rounded-[0.3rem] text-center">Erro de paragemto</Link> */}
      </CardFooter>
    </Card>
  )
}