import { Prisma, PrismaClient, Users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { validateUserData } from "./validations";
import * as bcrypt from 'bcrypt'
import AuthService from "@/auth/service/authService";

const prisma = new PrismaClient();

export async function POST (req: NextRequest){
    const newUser: Partial<Users> = await req.json()

    let errorMessage: string | null = validateUserData(newUser);

    if (errorMessage) {
        return Response.json({ error: errorMessage, status: 400 });
    }
    const hashPassword = await bcrypt.hash(newUser.password!, 10);
    const typeUser = 'client';
try {
        const createUser = await prisma.users.create({
            data: { email:newUser.email!,
                    telefone:newUser.telefone!,
                    telefone_emergencia:newUser.telefone_emergencia!,
                    rg:newUser.rg!,
                    cpf:newUser.cpf!,
                    data_de_nascimento:newUser.data_de_nascimento!,
                    name:newUser.name!,
                    termos_de_uso:newUser.termos_de_uso!,
                    password:hashPassword,
                    type:typeUser }
        })

        const token = await AuthService.createSessionToken({ sub: createUser.id, type: createUser.type });

        return Response.json({ message: 'Dados pessoais cadastrados com sucesso', status: 201, token});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const targetField = (error.meta?.target as string[])?.[0] ?? 'Campo não especificado';
            return Response.json({
                message: `Erro ao cadastrar usuário. O campo '${targetField}' é inválido. Tente novamente mais tarde`,
                status: 500,
                error
            });
        } else {
            return Response.json({
                message: 'Erro ao cadastrar usuário. Tente novamente mais tarde',
                status: 500,
                error
            });
        }
    }
}