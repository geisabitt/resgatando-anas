"use client"
import { useState, useEffect } from "react";
import { BsArrowRightShort, BsPersonCheckFill } from "react-icons/bs";
import { Card } from '@/components/ui/card';
import UserHeader from "@/components/shared/user-header";
import LoadingComponent from "@/components/LoadingComponent";
import { Users } from "@prisma/client";
import ButtonLinkIcon from "@/components/shared/button-link-icon";

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
            <Card className="border-0 shadow-0 flex flex-col text-gray-900 gap-4 p-4">
                <ButtonLinkIcon
                    btnColor={"bg-primary hover:bg-primary-foreground"}
                    btnClass={"flex-row-reverse font-bold"}
                    btnText={"Cadastros e pagamentos - Retiro de Mulheres 2024"}
                    btnLink={"/administracao/lista"}
                    icon={BsPersonCheckFill}
                />
                <ButtonLinkIcon
                    btnColor={"bg-primary hover:bg-primary-foreground"}
                    btnClass={"flex-row-reverse font-bold"}
                    btnText={"Cadastros e pagamentos - Retiro de Mulheres 2024"}
                    btnLink={"/administracao/lista-pagamento-mp"}
                    icon={BsPersonCheckFill}
                />
            </Card>
        </div>
    );
}
