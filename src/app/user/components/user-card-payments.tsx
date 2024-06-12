import React from "react";
import { BsTrashFill ,BsTrash  } from "react-icons/bs";
import Link from 'next/link';
import './user-card-payments'

export default function UserCardPayments({payment} : Readonly<{payment:DisplayUserPayments}>) {

    return (
        <div id={payment.paymentId} className="w-[90%] my-0 mx-auto container-payments relative">
            <button><BsTrash className="text-red300 absolute right-4" /></button>
            <p>{payment.paymentDescription}</p>
            <p className="">Identificador: {payment.paymentId}</p>
            <p className="">Tipo: {payment.paymentType}</p>
            <p>Status: {payment.paymentStatus}</p>
            <Link className="w-full py-4 rounded text-center ext-white bg-success700" href={payment.url}>{payment.btnText}</Link>
        </div>
    );
}