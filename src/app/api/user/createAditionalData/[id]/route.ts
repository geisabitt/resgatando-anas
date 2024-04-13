import { PrismaClient, UsersAnaminese } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST (req: NextRequest){
    const newUser: Partial<UsersAnaminese> = await req.json()

    let errorMessage: string | null = null;

    switch (true) {
        case newUser.userId === undefined:
            errorMessage = "Email inválido";
            break;
        case newUser.possui_doenca === undefined:
            errorMessage = "Nome inválido";
            break;
        case newUser.qual_doenca === undefined:
            errorMessage = "Senha inválido";
            break;
        case newUser.faz_uso_medicamento === undefined:
            errorMessage = "Tipo de usuario inválido";
            break;
        case newUser.qual_medicamento === undefined:
            errorMessage = "Telefone inválido";
            break;
        case newUser.alergia_medicamento === undefined:
            errorMessage = "Telefone Emergencia inválido";
            break;
        case newUser.alergia_qual_medicamento === undefined:
            errorMessage = "RG inválido";
            break;
        case newUser.restricao_alimentar === undefined:
            errorMessage = "CPF inválido";
            break;
        case newUser.quais_alimentos === undefined:
            errorMessage = "Data de nascimento inválido";
            break;
        case newUser.tamanho_blusa === undefined:
            errorMessage = "Data de nascimento inválido";
            break;
        default:
            break;
    }

    if (errorMessage) {
        return Response.json({ error: errorMessage, status: 400 });
    }
    try {

        if(newUser.userId){
        await prisma.usersAnaminese.create({
            data: { userId: newUser.userId,
                    possui_doenca: newUser.possui_doenca,
                    qual_doenca: newUser.qual_doenca,
                    faz_uso_medicamento: newUser.faz_uso_medicamento,
                    qual_medicamento: newUser.qual_medicamento,
                    alergia_medicamento: newUser.alergia_medicamento,
                    alergia_qual_medicamento: newUser.alergia_qual_medicamento,
                    restricao_alimentar: newUser.restricao_alimentar,
                    quais_alimentos: newUser.quais_alimentos,
                    tamanho_blusa: newUser.tamanho_blusa}
                })
                return Response.json({ message: 'Dados pessoais cadastrados com sucesso', status: 201 });
            }

    } catch (error) {
        return Response.json({ message: 'Erro ao cadastrar usuário. Tente novamente mais tarde', error, status: 500 });
    }
}