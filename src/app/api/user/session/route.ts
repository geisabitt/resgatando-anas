import { NextApiRequest, NextApiResponse } from 'next';
import AuthService from '@/auth/service/authService';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const isValid = await AuthService.isSessionValid();
    res.status(200).json({ isValid });
}
