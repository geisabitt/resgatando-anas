import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation';
import AuthService from '../service/authService';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();
const baseUrl = process.env.BASE_URL;

// async function createAccount(formData:FormData) {
//     'use server';

//     // nome: string;
//     // telefone: string;
//     // telefone_emergencia: string;
//     // rg: string;
//     // cpf: string;
//     // data_de_nascimento: string;
//     // email: string;
//     // password: string;
//     // passwordRepeat:string;

//         const name = formData.get('name') as string;
//         const telefone = formData.get('telefone') as string;
//         const telefone_emergencia = formData.get('telefone_emergencia') as string;
//         const rg = formData.get('rg') as string;
//         const cpf = formData.get('cpf') as string;
//         const data_de_nascimento = formData.get('data_de_nascimento') as string;
//         const email = formData.get('email') as string;
//         const password = formData.get('password') as string;
//         const passwordRepeat = formData.get('passwordRepeat') as string;
//         const type = 'client';

//         if (!name || !email || !password || !type) {
//             throw new Error('Todos os campos são obrigatórios');
//         }

//         const hashPassword = await bcrypt.hash(password, 10);

//         await prisma.users.create({
//             data: {
//                 name,
//                 email,
//                 password: hashPassword,
//                 type
//             }
//         });

//         redirect('/retiro/login')

//     }

async function login(formData:FormData) {
        'use server';

            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            console.log('Email:', email);
            console.log('Password:', password);

            if (!email || !password) {
                return NextResponse.json({ message: 'Todos os dados são obrigatórios' }, { status: 400 });
            }

            try {
                console.log('Enviando requisição para:', `${baseUrl}/api/user/login`);
                const response = await fetch(`${baseUrl}/api/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                console.log('Status da resposta:', response.status);

                const responseData = await response.json(); // Obter os dados da resposta aqui

                console.log('Dados da resposta:', responseData);

                if (!response.ok) {
                    // Se a resposta não for bem-sucedida, lança um erro com a mensagem correspondente
                    throw new Error('Falha ao fazer login');
                }

                cookies().set('session', responseData.token)
                return NextResponse.redirect(`${baseUrl}/api/user/userId`)

            } catch (error) {
                // Se ocorrer um erro durante a requisição, retorna uma mensagem de erro
                console.error('Erro ao fazer login:', error);
                return {
                    message: 'Erro ao fazer login. Tente novamente mais tarde.',
                    status: 500,
                };
            }
        }

const AuthActions ={
    // createAccount,
    login
}

export default AuthActions;