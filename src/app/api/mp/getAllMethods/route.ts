import { NextResponse } from "next/server";

const DATA_SOURCE_URL = 'https://api.mercadopago.com/v1/payment_methods';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_TEST_MERCADOPAGO;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const methods = await res.json();
  return NextResponse.json(methods);
}
