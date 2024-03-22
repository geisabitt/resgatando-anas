import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation';
import AuthService from '../service/authService';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function createAccount(formData:FormData) {
    'use server';

    // nome: string;
    // telefone: string;
    // telefone_emergencia: string;
    // rg: string;
    // cpf: string;
    // data_de_nascimento: string;
    // email: string;
    // password: string;
    // passwordRepeat:string;

        const name = formData.get('name') as string;
        const telefone = formData.get('telefone') as string;
        const telefone_emergencia = formData.get('telefone_emergencia') as string;
        const rg = formData.get('rg') as string;
        const cpf = formData.get('cpf') as string;
        const data_de_nascimento = formData.get('data_de_nascimento') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordRepeat = formData.get('passwordRepeat') as string;
        const type = 'client';

        if (!name || !email || !password || !type) {
            throw new Error('Todos os campos são obrigatórios');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await prisma.users.create({
            data: {
                name,
                email,
                password: hashPassword,
                type
            }
        });

        redirect('/retiro/login')

    }

async function login(formData:FormData) {
        'use server';

            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            if (!email || !password) {
                NextResponse.json({ message: 'Todos os dados são obrigatórios' }, { status: 400 });
            }

            const user = await prisma.users.findFirst({
                where:{
                    email,
                }
            })

            if(!user){
                NextResponse.json({ message: 'Dados do usuário incorreto, ou não encontrado.' }, { status: 404 });
                console.log('Usuario não encontrado')
                redirect('/retiro/login')
            }

            const isMatch = await bcrypt.compare(password, user?.password)

            if(!isMatch){
                NextResponse.json({ message: 'Dados do usuário incorreto, ou não encontrado.' }, { status: 404 });
                console.log('usuario ou senha invalidos');
                redirect('/retiro/login')
            }

            await AuthService.createSessionToken({sub: user.id ,type: user.type})

            NextResponse.json({ message: 'Login realizado com sucesso' }, { status: 202 });
            console.log('Login realizado com sucesso!');
            redirect(`/api/user/userId`)

        }

const AuthActions ={
    createAccount,
    login
}

export default AuthActions;