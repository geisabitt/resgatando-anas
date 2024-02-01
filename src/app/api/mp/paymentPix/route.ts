import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: 'Route Pix' }, { status: 200 });
}