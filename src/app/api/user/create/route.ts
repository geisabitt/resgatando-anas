import { PrismaClient, Users } from "@prisma/client";
import { NextRequest } from "next/server";
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
                    password:hashPassword,
                    type:typeUser }
        })
        
        const token = await AuthService.createSessionToken({ sub: createUser.id, type: createUser.type });

        return Response.json({ message: 'Dados pessoais cadastrados com sucesso', status: 201 , createUser, token});

    } catch (error) {

        return Response.json({ message: 'Erro ao cadastrar usuário. Tente novamente mais tarde', error, status: 500 });
    }
}