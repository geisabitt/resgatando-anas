import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SigninProgressiveForm } from "@/auth/components/cadastro/progressiveSingninForm";
import AuthService from '@/auth/service/authService';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Cadastro() {
  const session = await AuthService.isSessionValid()
  return (
    <div className="flex align-center justify-center p-8">
      {session? <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <h5>Mensagem do Sistema</h5>
          <CardDescription>Você já está cadastrada no sistema</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p>Caso esteja tentando resolver assuntos de pagamento acesse a MINHA PAGINA para ver mais informações.</p>
          <p>Caso esteja tentando ajudar alguem a se cadastrar MINHA PAGINA, clique em SAIR, para conseguir acessar a pagina de cadastro no retiro.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <Button className="w-full text-white"><Link href="/user">Minha Pagina</Link></Button>
        </CardFooter>
      </Card> : <SigninProgressiveForm />}
    </div>
  )
}