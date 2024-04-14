import { PrismaClient, UsersAnaminese } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST (req: NextRequest){
    const newUser: Partial<UsersAnaminese> = await req.json()

    const user = await prisma.users.findFirst({
        where:{ id: newUser.userId }
    })

    if(!user){

        console.log(newUser)
        console.log('Usuario não encontrado')
        return Response.json({ error: 'Dados do usuário incorreto, ou não encontrado.', status: 404 });
    }

    console.log(user)
    let errorMessage: string | null = null;

    switch (true) {
        case (newUser.userId === undefined || newUser.userId === ''):
            errorMessage = "Não foi possivel concluir o cadastro, usuario não encontrado";
            break;
        case (newUser.possui_doenca === undefined || newUser.possui_doenca === ''):
            errorMessage = "Não foi possivel concluir o cadastro, o campo possui doença não foi preenchido corretamente";
            break;
        case newUser.qual_doenca === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo possui doença não foi preenchido corretamente";
            break;
        case (newUser.faz_uso_medicamento === undefined || newUser.faz_uso_medicamento === ''):
            errorMessage = "Não foi possivel concluir o cadastro, o campo faz uso de medicamento não foi preenchido corretamente";
            break;
        case newUser.qual_medicamento === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo faz uso de medicamento não foi preenchido corretamente";
            break;
        case (newUser.alergia_medicamento === undefined || newUser.alergia_medicamento === ''):
            errorMessage = "Não foi possivel concluir o cadastro, o campo alergia a medicamento não foi preenchido corretamente";
            break;
        case newUser.alergia_qual_medicamento === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo alergia a medicamento não foi preenchido corretamente";
            break;
        case (newUser.restricao_alimentar === undefined || newUser.restricao_alimentar === ''):
            errorMessage = "Não foi possivel concluir o cadastro, o campo restrição / alergia alimentar não foi preenchido corretamente";
            break;
        case newUser.quais_alimentos === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo restrição / alergia alimentar não foi preenchido corretamente";
            break;
        case (newUser.tamanho_blusa === undefined || newUser.tamanho_blusa === ''):
            errorMessage = "Não foi possivel concluir o cadastro,  o campo tamanho da blusa não foi preenchido corretamente";
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
        return Response.json({ message: 'Erro ao cadastrar dados adicionai do usuário. Tente novamente mais tarde', error, status: 500 });
    }
}