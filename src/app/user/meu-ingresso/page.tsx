'use client'
import { useState, useEffect } from "react";
import Link from 'next/link';
import '../user-style.css';
import LoadingComponent from "@/components/LoadingComponent";
import UserCardPayments from "../components-local/user-card-payments";

type DisplayUserPayments = {
    id: string,
    userId: string,
    paymentId: string,
    paymentStatus: string,
    paymentType: string,
    paymentDescription: string,
    createdAt: string,
    url: string,
    btnText: string,
}

export default function Page() {
    const [payment, setPayment] = useState<DisplayUserPayments | null>(null);
    const [loading, setLoading] = useState(true);
    const [ticketQuantity, setTicketQuantity] = useState(0);

    useEffect(() => {
        const fetchUserPayments = async () => {
            try {
                const response = await fetch("/api/user/get-user-payments");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === 200 && data.payments && data.payments.length > 0) {
                    const lastPayment = data.payments.reduce((latest: DisplayUserPayments, current: DisplayUserPayments) => {
                        return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current;
                    });

                    const paymentIdContainsLetters = /[a-zA-Z]/.test(lastPayment.paymentId);

                    if (paymentIdContainsLetters) {
                        try {
                            const apiResponse = await fetch(`/api/mp/preference/get?id=${lastPayment.paymentId}`);
                            if (!apiResponse.ok) {
                                throw new Error('Failed to fetch payment status from MercadoPago');
                            }
                            const paymentData = await apiResponse.json();

                            if (paymentData.paymentStatus === 'Aprovado') {
                                setTicketQuantity(1);
                                setPayment({
                                    ...lastPayment,
                                    paymentStatus: 'Aprovado',
                                    url: '/retiro/pagamento/status/aprovado',
                                    btnText: 'Mais detalhes',
                                });
                                return;
                            }
                        } catch (error) {
                            console.error("Error fetching payment status from MercadoPago:", error);
                        }
                    }

                    let paymentUrl = `/retiro/pagamento/status/pendente/${lastPayment.paymentId}`;
                    let btnText = "Ver detalhes do pagamento";

                    if (lastPayment.paymentStatus === 'Cancelado' && lastPayment.paymentType === 'Pix') {
                        paymentUrl = '/retiro/pagamento/status/pix-expirado';
                    } else if (lastPayment.paymentType.includes('Cartão') &&
                        (lastPayment.paymentStatus === 'Recusado' || lastPayment.paymentStatus === 'Pendente')) {
                        paymentUrl = '/retiro/pagamento';
                        btnText = 'Comprar ingresso';
                    }

                    const formattedPayment: DisplayUserPayments = {
                        ...lastPayment,
                        url: paymentUrl,
                        btnText: btnText,
                    };

                    if (lastPayment.paymentStatus === 'Aprovado') {
                        setTicketQuantity(1);
                        setPayment({
                            ...lastPayment,
                            url: '/retiro/pagamento/status/aprovado',
                            btnText: 'Mais detalhes',
                        });
                    } else {
                        setPayment(formattedPayment);
                    }
                } else {
                    const emptyPayment: DisplayUserPayments = {
                        id: 'empty',
                        userId: '',
                        paymentId: '',
                        paymentStatus: '',
                        paymentType: '',
                        paymentDescription: '',
                        createdAt: '',
                        url: '/retiro/pagamento',
                        btnText: 'Comprar ingresso'
                    };
                    setPayment(emptyPayment);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user payments:", error);
                setLoading(false);
            }
        };
        fetchUserPayments();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col w-[95%] min-h-[80vh] items-center text-gray-900 gap-5 mx-auto justify-between">
            <h3 className="text-center">Meu Ingresso</h3>
            <div>
                <p className="w-full min-w-[342px] flex justify-between rounded border border-primary p-4 ">
                    Quantidade <span>{ticketQuantity}</span>
                </p>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
                {payment && <UserCardPayments key={payment.paymentId || 'empty'} payment={payment} />}
            </div>
            <Link className="w-full py-4 mt-auto rounded text-center bg-blue700 text-white" href={'/user'}>
                Voltar
            </Link>
        </div>
    );
}
