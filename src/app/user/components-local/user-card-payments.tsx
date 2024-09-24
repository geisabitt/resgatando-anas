import React from "react";
import { formatDate } from "@/lib/formatters";
import { BsTrashFill ,BsTrash  } from "react-icons/bs";
import Link from 'next/link';
import './user-card-payments'

export default function UserCardPayments({ payment }: Readonly<{ payment: DisplayUserPayments }>) {

    return (
        <div id={payment.paymentId} className="w-[90%] min-w-[342px] my-0 mx-auto container-payments">
            <p>Retiro Resgatando Anas 2024</p>
            <p>Identificador: {payment.paymentId}</p>
            <p>Forma de Pagamento: {payment.paymentType}</p>
            <p>Status: {payment.paymentStatus}</p>
            <p>Data da Compra: {payment.createdAt ? formatDate(payment.createdAt) : ''}</p>
            <p>Valor: {payment.paymentId !== '' ? 'R$250,00' : ''}</p>
            <Link className="w-full py-4 rounded text-center text-white bg-success700 mt-4" href={payment.url}>
                {payment.btnText}
            </Link>
        </div>
    );
}
