// import { PrismaClient } from '@prisma/client'
// import * as bcrypt from 'bcrypt'
// import { redirect } from 'next/navigation';
// import AuthService from '../service/authService';
// import { NextRequest } from 'next/server';

export async function GET() {

    return Response.json({message: 'Hello Login'})

        // const user = await prisma.users.findFirst({
        //     where:{
        //         email,
        //     }
        // })

        // if(!user){
        //     Response.json({ message: 'Dados do usuário incorreto, ou não encontrado.' }, { status: 404 });
        //     console.log('Usuario não encontrado')
        //     redirect('/retiro/login')
        // }

        // const isMatch = await bcrypt.compare(password, user?.password)

        // if(!isMatch){
        //     Response.json({ message: 'Dados do usuário incorreto, ou não encontrado.' }, { status: 404 });
        //     console.log('usuario ou senha invalidos');
        //     redirect('/retiro/login')
        // }

        // await AuthService.createSessionToken({sub: user.id ,type: user.type})

        // Response.json({ message: 'Login realizado com sucesso' }, { status: 202 });
        // console.log('Login realizado com sucesso!');
        // redirect(`/api/user/userId`)

    }