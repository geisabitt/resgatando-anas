'use client'
import { useState, useEffect } from "react";
import Link from 'next/link';
import '../user-style.css';
import './style.css';
import LoadingComponent from "@/components/LoadingComponent";
import UserCardPayments from "../components-local/user-card-payments";

export default function Page() {
    const [payments, setPayments] = useState<DisplayUserPayments[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUserPayments = async () => {
            try {
                const response = await fetch("/api/user/get-user-payments");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === 200 && data.payments) {
                    const formattedPayments = data.payments.map((p: DisplayUserPayments) => ({
                        paymentId: p.paymentId,
                        paymentStatus: p.paymentStatus,
                        paymentType: p.paymentType,
                        paymentDescription: p.paymentDescription,
                        url: p.paymentStatus === 'Cancelado' && p.paymentType === 'Pix' ? '/retiro/pagamento/status/pix-expirado' : `/retiro/pagamento/status/pendente/${p.paymentId}`,
                        btnText: "Ver pagamento",
                    }));
                    setPayments(formattedPayments);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching user payments:", error);
                setLoading(false);
            }
        };
    fetchUserPayments();

    }, []);

    if (loading) {
        return <LoadingComponent/>;
    }

    return (
        <div className="flex flex-col align-center text-gray-900 gap-5">
            <h3>Meu Ingresso</h3>
            <div className="container">
                <p>Quantidade <span>0</span></p>
            </div>
            <div className="flex flex-col gap-4">
                {payments.map((payment) => (
                    <UserCardPayments key={payment.paymentId} payment={payment} />
                ))}
            </div>
            <Link className="py-4 rounded text-center bg-blue700 text-white" href={'/user'}>Voltar</Link>
        </div>
    );
}
