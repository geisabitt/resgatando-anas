import AuthService from '@/auth/service/authService';
import { PrismaClient, Users } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server';


/**
 * @swagger
 * /api/user/login:
 *  post:
 *    sumary: Login de usuário
 *    description: Essa rota é responsavel pelo login do usuário
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
 *                      password:
 *                          type: string
 *    responses:
 *      200:
 *        description: Login realizado com sucesso
 *      400:
 *        description: Todos os dados são obrigatórios
 *      401:
 *        description: Credenciais inválidas
 *      404:
 *        description: Usuário não encontrado
 *      403:
 *        description: Não autorizado
 *      500:
 *        description: Erro interno do servidor
*/

const prisma = new PrismaClient();

export async function POST(req:NextRequest) {

    const userLogin: Partial<Users> = await req.json()

    const email = userLogin.email;
    const password = userLogin.password;

    if (!email || !password) {
        return NextResponse.json({ message: 'Todos os dados são obrigatórios' }, { status: 400 });
    }

    const user = await prisma.users.findFirst({
        where: {
            email,
        }
    });

    if (!user) {
        return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
    }


    const token = await AuthService.createSessionToken({ sub: user.id, type: user.type });


    return Response.json({ message: 'Login realizado com sucesso', token }, { status: 200 });
}