import React from "react";
import Link from 'next/link';
import './user-card-payments'

export default function UserCardPayments({payment} : Readonly<{payment:DisplayUserPayments}>) {

    return (

                <div id={payment.paymentId} className="container-payments">
                    <p>{payment.paymentDescription}</p>
                    <p className="">Pagamento Id: {payment.paymentId}</p>
                    <p>Status: {payment.paymentStatus}</p>
                    <Link className="w-full py-4 rounded text-center ext-white bg-success700" href={payment.url}>{payment.btnText}</Link>
                </div>
    );
}