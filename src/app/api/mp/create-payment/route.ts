import { NextRequest, NextResponse } from "next/server";
import MercadoPago, { Payment } from 'mercadopago'; // Certifique-se de importar corretamente
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest, res: NextResponse) {
    const newPayment = await req.json();
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_PROD_MERCADOPAGO;


    if (!ACCESS_TOKEN) {
        return Response.json({ status: 403, error: 'Não foi possível se conectar ao MercadoPago, tente novamente' });
    }

    const idempotencyKey = uuidv4();

    const client = new MercadoPago({ accessToken: ACCESS_TOKEN, options: { timeout: 5000 } });
    const payment = new Payment(client);

    try {
        console.log(newPayment);

        const paymentResponse = await payment.create({
            body: { ...newPayment },
            requestOptions: {
                idempotencyKey: idempotencyKey
            }
        });

        if(parseInt(paymentResponse.status!) !== 200){
                console.log(paymentResponse);
                return Response.json(paymentResponse);
        }
        return Response.json({ message: 'Pagamento criado com sucesso', status: 201, paymentResponse });
    } catch (error) {
        console.error(error);
        return Response.json({
            message: 'Erro ao processar o pagamento',
            status: 400,
            error: error
        });
    }
}
/*{
    "id": 78451117483,
    "date_created": "2024-05-19T13:00:11.977-04:00",
    "date_approved": null,
    "date_last_updated": "2024-05-19T13:00:11.977-04:00",
    "date_of_expiration": null,
    "money_release_date": null,
    "money_release_status": "released",
    "operation_type": "regular_payment",
    "issuer_id": "24",
    "payment_method_id": "master",
    "payment_type_id": "credit_card",
    "payment_method": {
        "id": "master",
        "type": "credit_card",
        "issuer_id": "24",
        "data": {
            "routing_data": {
                "merchant_account_id": "60272716"
            }
        }
    },
    "status": "rejected",
    "status_detail": "cc_rejected_high_risk",
    "currency_id": "BRL",
    "description": null,
    "live_mode": true,
    "sponsor_id": null,
    "authorization_code": null,
    "money_release_schema": null,
    "taxes_amount": 0,
    "counter_currency": null,
    "brand_id": null,
    "shipping_amount": 0,
    "build_version": "3.51.3",
    "pos_id": null,
    "store_id": null,
    "integrator_id": null,
    "platform_id": null,
    "corporation_id": null,
    "payer": {
        "type": null,
        "id": "1607260494",
        "operator_id": null,
        "email": null,
        "identification": {
            "number": null,
            "type": null
        },
        "phone": {
            "number": null,
            "extension": null,
            "area_code": null
        },
        "first_name": null,
        "last_name": null,
        "entity_type": null
    },
    "collector_id": 1527065701,
    "marketplace_owner": null,
    "metadata": {},
    "additional_info": {
        "available_balance": null,
        "nsu_processadora": null,
        "authentication_code": null
    },
    "order": {},
    "external_reference": null,
    "transaction_amount": 0.5,
    "transaction_amount_refunded": 0,
    "coupon_amount": 0,
    "differential_pricing_id": null,
    "financing_group": null,
    "deduction_schema": null,
    "installments": 1,
    "transaction_details": {
        "payment_method_reference_id": null,
        "acquirer_reference": null,
        "net_received_amount": 0,
        "total_paid_amount": 0.5,
        "overpaid_amount": 0,
        "external_resource_url": null,
        "installment_amount": 0.5,
        "financial_institution": null,
        "payable_deferral_period": null
    },
    "fee_details": [],
    "charges_details": [
        {
            "id": "78451117483-001",
            "name": "mercadopago_fee",
            "type": "fee",
            "accounts": {
                "from": "collector",
                "to": "mp"
            },
            "client_id": 0,
            "date_created": "2024-05-19T13:00:11.980-04:00",
            "last_updated": "2024-05-19T13:00:11.980-04:00",
            "amounts": {
                "original": 0.02,
                "refunded": 0
            },
            "metadata": {},
            "reserve_id": null,
            "refund_charges": []
        }
    ],
    "captured": true,
    "binary_mode": false,
    "call_for_authorize_id": null,
    "statement_descriptor": null,
    "card": {
        "id": null,
        "first_six_digits": null,
        "last_four_digits": "6351",
        "bin": null,
        "expiration_month": null,
        "expiration_year": null,
        "date_created": null,
        "date_last_updated": null,
        "country": null,
        "tags": null,
        "cardholder": {
            "identification": {
                "number": null,
                "type": null
            },
            "name": null
        }
    },
    "notification_url": null,
    "refunds": [],
    "processing_mode": "aggregator",
    "merchant_account_id": null,
    "merchant_number": null,
    "acquirer_reconciliation": [],
    "point_of_interaction": {
        "type": "UNSPECIFIED",
        "business_info": {
            "unit": "online_payments",
            "sub_unit": "sdk",
            "branch": null
        },
        "transaction_data": {}
    },
    "accounts_info": null,
    "tags": null,
    "api_response": {
        "status": 201,
        "headers": {
            "date": [
                "Sun, 19 May 2024 17:00:12 GMT"
            ],
            "content-type": [
                "application/json;charset=UTF-8"
            ],
            "transfer-encoding": [
                "chunked"
            ],
            "connection": [
                "close"
            ],
            "x-site-id": [
                "MLB"
            ],
            "vary": [
                "Accept,Accept-Encoding"
            ],
            "cache-control": [
                "max-age=0"
            ],
            "etag": [
                "79d90431804901d7749d30cd87c00d01"
            ],
            "x-content-type-options": [
                "nosniff"
            ],
            "x-request-id": [
                "12cd3010-df27-4b59-a048-d9d113e697ca"
            ],
            "x-xss-protection": [
                "1; mode=block"
            ],
            "strict-transport-security": [
                "max-age=16070400; includeSubDomains; preload"
            ],
            "access-control-allow-origin": [
                "*"
            ],
            "access-control-allow-headers": [
                "Content-Type"
            ],
            "access-control-allow-methods": [
                "PUT, GET, POST, DELETE, OPTIONS"
            ],
            "access-control-max-age": [
                "86400"
            ],
            "timing-allow-origin": [
                "*"
            ]
        }
    }
}*/
