import { NextResponse, NextRequest } from "next/server";
import MercadoPago, { Preference } from 'mercadopago';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_MERCADOPAGO;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const preferenceId = searchParams.get('id');


    if (!preferenceId) {
        return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
    }

    try {
        const client = new MercadoPago({ accessToken: ACCESS_TOKEN! });

        const preference = new Preference(client);
        const response = await preference.get({ preferenceId });
        console.log('response:', response)

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching payment preference:', error);
        return NextResponse.json({ error: 'Failed to fetch payment preference' }, { status: 500 });
    }
}
