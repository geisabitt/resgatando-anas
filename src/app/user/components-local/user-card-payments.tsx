import React from "react";
import { BsTrashFill ,BsTrash  } from "react-icons/bs";
import Link from 'next/link';
import './user-card-payments'

export default function UserCardPayments({ payment }: Readonly<{ payment: DisplayUserPayments }>) {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div id={payment.paymentId} className="w-[90%] min-w-[342px] my-0 mx-auto container-payments">
            <p>{payment.paymentDescription}</p>
            <p>Identificador: {payment.paymentId}</p>
            <p>Forma de Pagamento: {payment.paymentType}</p>
            <p>Status: {payment.paymentStatus}</p>
            {payment.paymentStatus === 'Aprovado' && (
                <>
                    <p>Data de Criação: {formatDate(payment.createdAt)}</p>
                    <p>Valor: R$250,00</p>
                </>
            )}
            {payment.paymentStatus !== 'Aprovado' && (
                <Link className="w-full py-4 rounded text-center text-white bg-success700 mt-4" href={payment.url}>
                    {payment.btnText}
                </Link>
            )}
        </div>
    );
}
