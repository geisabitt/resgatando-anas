import { NextResponse } from 'next/server';
import AuthService from '@/auth/service/authService';

export async function GET() {
    const isValid = await AuthService.isSessionValid();
    return NextResponse.json({ isValid });
}