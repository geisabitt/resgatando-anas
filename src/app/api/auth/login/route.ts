import { PrismaClient, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/auth/service/authService';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const userLogin: Partial<Users> = await req.json();

        const { email, password } = userLogin;

        if (!email || !password) {
            return NextResponse.json({ message: 'E-mail e senha são obrigatórios.' }, { status: 400 });
        }

        const user = await prisma.users.findFirst({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: 'E-mail ou senha incorretos.' }, { status: 401 });
        }

        await AuthService.createSessionToken({ sub: user.id, type: user.type });

        const redirectUrl = user.type === 'admin' ? '/administracao' : '/user';

        return NextResponse.json({ message: 'Login realizado com sucesso', urlRedirect: redirectUrl }, { status: 200 });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}