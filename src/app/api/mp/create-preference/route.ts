import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import MercadoPago, { Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import AuthService from "@/auth/service/authService";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    const newPayment = await req.json();
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_MERCADOPAGO;
    const INTEGRATORID = process.env.INTEGRATORID;
    const id = await AuthService.creatRouteId();

    if (id) {
        const user = await prisma.users.findFirst({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                cpf: true,
                telefone: true,
                type: true,
            }
        });

        if (!user) {
            return NextResponse.json({ status: 404, error: 'Usuário não encontrado' });
        }

        const telefone = user.telefone;
        const areaCode = telefone!.slice(0, 2);
        const number = telefone!.slice(2);

        if (!ACCESS_TOKEN) {
            return NextResponse.json({ status: 403, error: 'Não foi possível se conectar ao MercadoPago, tente novamente' });
        }

        const idempotencyKey = uuidv4();
        const client = new MercadoPago({ accessToken: ACCESS_TOKEN, options: { timeout: 5000, integratorId: INTEGRATORID } });
        const preference = new Preference(client);

        try {
            console.log('newPayment:', newPayment);

            const paymentResponse = await preference.create({
                body: {
                    items: [
                        {
                            id: '2024',
                            title: 'Retiro Resgatando Anas 2024',
                            description: 'Ingresso para retiro de 3 dias em uma chácara em Nova Iguaçu',
                            picture_url: 'https://resgatando-anas.vercel.app/_next/image?url=%2Fimg%2FLogoResgatandoAnas.png&w=64&q=75',
                            category_id: 'Ingresso',
                            quantity: 1,
                            currency_id: 'BRL',
                            unit_price: 250,
                        }
                    ],
                    payer: {
                        name: user.name,
                        email: user.email,
                        phone: {
                            area_code: areaCode,
                            number: number,
                        },
                        identification: {
                            type: 'CPF',
                            number: `${user.cpf}`,
                        },
                    },
                    back_urls: {
                        success: `${process.env.BASE_URL}/retiro/pagamento/status/aprovado`,
                        failure: `${process.env.BASE_URL}/retiro/pagamento/status/cartao-recusado`,
                        pending: `${process.env.BASE_URL}/retiro/pagamento/status/cartao-pendente`,
                    },
                    differential_pricing: {
                        id: 1,
                    },
                    expires: false,
                    auto_return: 'all',
                    external_reference: '1643827245',
                    notification_url: 'http://notificationurl.com',
                    payment_methods: {
                        default_payment_method_id: 'master',
                        excluded_payment_types: [
                            {
                                id: 'ticket',
                            },
                        ],
                        excluded_payment_methods: [
                            {
                                id: 'visa',
                            },
                        ],
                        installments: 6,
                        default_installments: 1,
                    },
                    statement_descriptor: 'Resgatando Anas',
                },
                requestOptions: { idempotencyKey: idempotencyKey }
            });

            console.log('paymentResponse:', paymentResponse);

            return NextResponse.json({
                status: 200,
                message: 'Pagamento criado com sucesso',
                init_point: paymentResponse.init_point,
                sandbox_init_point: paymentResponse.sandbox_init_point,
            });

        } catch (error) {
            console.error('Erro ao processar o pagamento:', error);
            return NextResponse.json({
                status: 400,
                message: 'Erro ao processar o pagamento',
                error: error
            });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.json({ status: 400, error: 'Erro ao criar Route ID' });
    }
}
