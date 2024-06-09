'use client'
import { useState, useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Users } from "@prisma/client";
import { Card } from '@/components/ui/card';
import ButtonLink from "@/components/shared/button-link";
import UserHeader from "./components/user-header";
import UserCardPayments from "./components/user-card-payments";
import './user-style.css';
import LoadingComponent from "@/components/LoadingComponent";

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
                if (data.status === 200 && data.payment) {
                    const formattedPayments = data.payment.map((p: any) => ({
                        paymentId: p.paymentId,
                        paymentStatus: p.paymentStatus ?? "Pendente",
                        paymentDescription: p.paymentDescription,
                        url: `/retiro/pagamento/pix/${p.paymentId}`,
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
        <div className="flex flex-col align-center justify-center text-gray-900">
            <UserHeader user={user} />
            <Card className="border-0 shadow-0 flex flex-col gap-4 p-4">
                <ButtonLink
                    btnClass={"p-6 flex items-center justify-between bg-primary hover:bg-primary-foreground"}
                    btnText={"Dados Pessoais"}
                    btnLink={"/user/edit-dados-pessoais"}
                    icon={BsArrowRightShort}
                />
                <ButtonLink
                    btnClass={"p-6 flex items-center justify-between bg-primary hover:bg-primary-foreground"}
                    btnText={"Dados Adicionais"}
                    btnLink={"/user/edit-dados-adicionais"}
                    icon={BsArrowRightShort}
                />
            </Card>
            {payments.map((payment) => (
                <UserCardPayments key={payment.paymentId} payment={payment} />
            ))}
        </div>
    );
}
