import { PrismaClient, Users } from "@prisma/client";
import { NextRequest } from "next/server";
import { validateUserData } from "./validations";
import * as bcrypt from 'bcrypt'

/**
 * @swagger
 * /api/user/create:
 *  post:
 *    sumary: Cadastro de usuário
 *    description: Essa rota é responsavel pelo cadastro de um novo usuário
 *    tags: ['Usuario']
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      telefone:
 *                          type: string
 *                      image:
 *                          type: string
 *                      telefone_emergencia:
 *                          type: string
 *                      rg:
 *                          type: string
 *                      cpf:
 *                          type: string
 *                      data_de_nascimento:
 *                          type: string
 *                      name:
 *                          type: string
 *                      password:
 *                          type: string
 *    responses:
 *      201:
 *        description: Usuario cadastrado com sucesso
 *      400:
 *        description: Dados Incorretos
 *      404:
 *        description: Não encontado
 *      403:
 *        description: Não autorizado
 *      500:
 *        description: Erro interno do servidor
*/

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

        return Response.json({ message: 'Dados pessoais cadastrados com sucesso', status: 201 , createUser});
    } catch (error) {
        return Response.json({ message: 'Erro ao cadastrar usuário. Tente novamente mais tarde', error, status: 500 });
    }
}