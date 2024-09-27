import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/auth/service/authService';

export async function POST(req: NextRequest) {
    try {
        await AuthService.destroySession();

        const response = NextResponse.json({ message: 'Logout realizado com sucesso' }, { status: 200 });
        response.cookies.set('jwt', '', { httpOnly: true, secure: true, sameSite: 'strict', maxAge: -1 });

        return response;
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        return NextResponse.json({ message: 'Erro ao fazer logout.' }, { status: 500 });
    }
}