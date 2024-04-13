import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import AuthActions from "@/auth/actions/authActions"
import { Car } from "lucide-react"

export function SigninForm() {
  return (
    <Card className="w-[350px]">
        {/* <form action={AuthActions.createAccount}> */}
        <form>
            <CardHeader>
                <CardTitle>Cadastre-se</CardTitle>
                <CardDescription>Preencha seu dados para fazer o cadastro.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <Card className="flex flex-col space-y-1.5">
                    <Label htmlFor="nome">Nome</Label>
                    <Input name='nome' id="nome" type="text" placeholder="Digite seu nome" required />
                    </Card>
                    <Card className="flex flex-col space-y-1.5">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input name='telefone' id="telefone" type="text" placeholder="(21)98999-9999" required />
                    </Card>
                    <Card className="flex flex-col space-y-1.5">
                    <Label htmlFor="telefone_emergencia">Telefone de emergencia</Label>
                    <Input name='telefone_emergencia' id="telefone_emergencia" type="text" placeholder="Digite seu nome" required />
                    </Card>
                    <Card className="flex flex-col space-y-1.5">
                    <Label htmlFor="rg">RG</Label>
                    <Input name='rg' id="rg" type="text" placeholder="Digite seu nome" required />
                    </Card>
                    <Card className="flex flex-col space-y-1.5">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input name='cpf' id="cpf" type="text" placeholder="Digite seu nome" required />
                    </Card>
                    <Card className="flex flex-col space-y-1.5">
                    <Label htmlFor="data_de_nascimento">Data de Nascimento</Label>
                    <Input name='data_de_nascimento' id="data_de_nascimento" type="date" required />
                    </Card>
                    <Card>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input name='email' id="email" type="email" placeholder="Digite seu email" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Senha</Label>
                    <Input name='password' id="password" type="password" placeholder="Digite uma senha segura" required />
                    </div>
                    </Card>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button type='submit'>Cadastrar</Button>
                <Link href='login' className={buttonVariants({variant:"outline"})}>Já tenho cadastro</Link>
            </CardFooter>
        </form>
    </Card>
  )
}
