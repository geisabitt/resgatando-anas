import { PrismaClient, Users } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST (req: NextRequest){
    const newUser: Partial<Users> = await req.json()

    let errorMessage: string | null = null;

    switch (true) {
        case newUser.email === undefined:
            errorMessage = "Email inválido";
            break;
        case newUser.name === undefined:
            errorMessage = "Nome inválido";
            break;
        case newUser.password === undefined:
            errorMessage = "Senha inválido";
            break;
        case newUser.type === undefined:
            errorMessage = "Tipo de usuario inválido";
            break;
        case newUser.telefone === undefined:
            errorMessage = "Telefone inválido";
            break;
        case newUser.telefone_emergencia === undefined:
            errorMessage = "Telefone Emergencia inválido";
            break;
        case newUser.rg === undefined:
            errorMessage = "RG inválido";
            break;
        case newUser.cpf === undefined:
            errorMessage = "CPF inválido";
            break;
        case newUser.data_de_nascimento === undefined:
            errorMessage = "Data de nascimento inválido";
            break;
        default:
            break;
    }

    if (errorMessage) {
        return Response.json({ error: errorMessage, status: 400 });
    }
    try {
        const createUser = await prisma.users.create({
            data: { email:newUser.email!,
                    telefone:newUser.telefone!,
                    telefone_emergencia:newUser.telefone_emergencia!,
                    rg:newUser.rg!,
                    cpf:newUser.cpf!,
                    data_de_nascimento:newUser.data_de_nascimento!,
                    name:newUser.name!,
                    password:newUser.password!,
                    type:newUser.type! }
        })

        return Response.json({ message: 'Dados pessoais cadastrados com sucesso', status: 201 , createUser});
    } catch (error) {
        return Response.json({ message: 'Erro ao cadastrar usuário. Tente novamente mais tarde', error, status: 500 });
    }
}