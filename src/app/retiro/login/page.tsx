import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertSistem } from "@/components/shared/alertSistem"

export function Page() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Preencha seu dados para logar.</CardDescription>
      </CardHeader>
        <form>
        <CardContent>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input name='email' type='email' id="email" placeholder="Digite seu email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input name='password' type='password' id="password" placeholder="Digite uma senha segura" />
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button type='submit'>Entrar</Button>
            <Link href='/retiro/cadastro' className={buttonVariants({variant:"outline"})}>Não tenho cadastro</Link>
        </CardFooter>
        </form>
    </Card>
  )
}
