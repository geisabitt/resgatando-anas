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
import AuthActions from "@/auth/actions/auth-actions"

export function SigninForm() {
  return (
    <Card className="w-[350px]">
        <form action={AuthActions.createAccount}>
            <CardHeader>
                <CardTitle>Cadastre-se</CardTitle>
                <CardDescription>Preencha seu dados para fazer o cadastro.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nome</Label>
                    <Input name='name' id="name" type="text" placeholder="Digite seu nome" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input name='email' id="email" type="email" placeholder="Digite seu email" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Senha</Label>
                    <Input name='password' id="password" type="password" placeholder="Digite uma senha segura" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Confirme sua senha</Label>
                    <Input name='confirmPassword' id="confirmPassword" type="password" placeholder="Digite a mesma senha" required />
                    </div>
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
