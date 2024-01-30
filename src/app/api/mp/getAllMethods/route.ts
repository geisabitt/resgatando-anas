import { NextResponse } from "next/server";

const DATA_SOURCE_URL = 'https://api.mercadopago.com/v1/payment_methods';
const ACCESS_TOKEN = 'TEST-2544594867125996-120217-833765c07a62414e97a6e52f97d49a82-1527065701';

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
