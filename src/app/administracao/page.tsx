"use client"
import { useState, useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Card } from '@/components/ui/card';
import ButtonLink from "@/components/shared/button-link";
import UserHeader from "@/components/shared/user-header";
import LoadingComponent from "@/components/LoadingComponent";
import Link from "next/link";
import { Users } from "@prisma/client";

export default function Page() {
    const [user, setUser] = useState<Partial<Users>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user/user-id");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === 200 && data.user) {
                    setUser(data.user);
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false)
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col align-center justify-center text-gray-900">
            <UserHeader user={user} />
            <Card className="border-0 shadow-0 flex flex-col gap-4 p-4">
                <ButtonLink
                    btnClass={"p-6 flex items-center justify-between bg-primary hover:bg-primary-foreground"}
                    btnText={"Lista de cadastros"}
                    btnLink={"/administracao/lista"}
                    icon={BsArrowRightShort}
                />
                <ButtonLink
                    btnClass={"p-6 flex text-left items-center justify-between bg-primary hover:bg-primary-foreground"}
                    btnText={"Lista pagamentos aprovados"}
                    btnLink={"/administracao/lista-pagamento-aprovado"}
                    icon={BsArrowRightShort}
                />
                <ButtonLink
                    btnClass={"p-6 flex items-center justify-between bg-primary hover:bg-primary-foreground"}
                    btnText={"Lista do mercado pago"}
                    btnLink={"/administracao/lista-pagamento-mp"}
                    icon={BsArrowRightShort}
                />
            </Card>
        </div>
    );
}
