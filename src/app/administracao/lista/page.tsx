'use client';
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent";
import { PaymentUser, Users } from "@prisma/client";
import ButtonBack from "@/components/shared/btn-back";
import { Card } from "@/components/ui";
import ButtonLink from "@/components/shared/button-link";

export default function Page() {
    const [allUser, setAllUser] = useState<Partial<Users>[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastPayments, setLastPayments] = useState<Record<string, Partial<PaymentUser> | null>>({});

    const fetchUserPayments = async (userId: string) => {
        try {
            const response = await fetch(`/api/payment/get?id=${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.status === 200 && data.payments) {
                const payments = data.payments;
                const lastPayment = payments.length > 0
                    ? payments.reduce((latest: Partial<PaymentUser>, current: Partial<PaymentUser>) => {
                        return new Date(latest.createdAt!) > new Date(current.createdAt!) ? latest : current;
                    })
                    : null;

                setLastPayments(prev => ({ ...prev, [userId]: lastPayment }));
            } else {
                setLastPayments(prev => ({ ...prev, [userId]: null }));
            }
        } catch (error) {
            console.error("Error fetching user payments:", error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await fetch("/api/adm/get-all-users");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.status === 200) {
                setAllUser(data.allUser);

                data.allUser.forEach((user: Partial<Users>) => {
                    fetchUserPayments(user.id!);
                });
            } else {
                setAllUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="max-w-[380px]">
            {allUser ? (
                allUser.map((user) => {
                    const userLastPayment = lastPayments[user.id!];
                    return (
                        <Card className="p-4 border-0 bg-primary-foreground mb-8" key={user.id}>
                            <p>Nome: <span>{user.name}</span></p>
                            <p>Status: <span>{userLastPayment ? userLastPayment.paymentStatus : ""}</span></p>
                            <p>Pagamento: <span>{userLastPayment ? userLastPayment.paymentType : ""}</span></p>
                            <ButtonLink
                                btnClass={"text-center text-white font-bold justify-center"}
                                btnText={"Ver mais"}
                                btnLink={`/administracao/lista/${user.id}`}
                            />
                        </Card>
                    );
                })
            ) : (
                <Card className="p-4 border-0 bg-primary-foreground">Não foi possível carregar a lista</Card>
            )}
            <ButtonBack />
        </div>
    );
}
