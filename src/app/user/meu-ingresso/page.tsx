'use client'
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Users } from "@prisma/client";
import '../user-style.css';
import './style.css';
import LoadingComponent from "@/components/LoadingComponent";
import UserCardPayments from "../components-local/user-card-payments";

export default function Page() {
    const [user, setUser] = useState<Partial<Users>>({});
    const [payments, setPayments] = useState<DisplayUserPayments[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user/user-id");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === 201 && data.user) {
                    setUser(data.user);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

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
                        url: p.paymentStatus === 'Cancelado' && p.paymentType === 'Pix' ? '/retiro/pagamento/status/pix-expirado' : `/retiro/pagamento/pix/${p.paymentId}`,
                        btnText: "Ver pagamento",
                    }));
                    setPayments(formattedPayments);
                }
            } catch (error) {
                console.error("Error fetching user payments:", error);
            }
        };
    fetchUserData();
    fetchUserPayments();

    }, []);

    if (loading) {
        return <LoadingComponent/>;
    }

    return (
        <div className="flex flex-col align-center text-gray-900 min-h-[80vh] relative">
            <h3>Meu Ingresso</h3>
            <div className="flex flex-col gap-4">
                <p className="container">Quantidade <span>0</span></p>
            </div>
            <div className="flex flex-col gap-4">
                {payments.map((payment) => (
                    <UserCardPayments key={payment.paymentId} payment={payment} />
                ))}
            </div>
            <Link className="w-[93%] py-4 rounded text-center bg-blue700 text-white fixed bottom-[100px]" href={'/user'}>Voltar</Link>
        </div>
    );
}
