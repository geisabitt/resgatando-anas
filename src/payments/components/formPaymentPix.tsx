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
import PaymentService from "../services/paymentServices"

export function FormPaymentPix() {
  return (
    <Card className="w-[350px]">
        <form action={PaymentService.PaymentPix}>
            <CardHeader>
                <CardTitle>Retiro de mulheres 2024</CardTitle>
                <CardDescription>Tema: Descendo do Salto</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nome</Label>
                    <Input name='name' id="name" type="text" placeholder="Digite seu nome" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input name='phone' id="telefone" type="text" placeholder="(21)98999-9999" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input name='email' id="email" type="text" placeholder="exemplo@email.com" required />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button type='submit'>Comprar</Button>
                <Link href='login' className={buttonVariants({variant:"outline"})}>Já tenho cadastro</Link>
            </CardFooter>
        </form>
    </Card>
  )
}
