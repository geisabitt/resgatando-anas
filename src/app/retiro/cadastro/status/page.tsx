import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Status() {
  return (
    <div className="flex align-center justify-center p-8 text-center">
        <Card className="w-[350px] bg-[#F4E5E6]">
      <CardHeader>
        <CardTitle>Confirmação de conta</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="py-2">Sua conta foi confirmado com sucesso</p>
        <p>Realize o pagamento para garantir o seu ingresso no nosso retiro.</p>
        <CardDescription>Nesse momento apenas o primeiro lote com valor promocional via pix está disponivel no site.</CardDescription>
      </CardContent>
      <CardFooter className="flex">
        <Button className="w-full bg-success">Ir para Pagamento</Button>
      </CardFooter>
    </Card>
    </div>
  )
}