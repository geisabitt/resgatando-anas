'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsArrowRightShort } from "react-icons/bs";
import { Users, UsersAnaminese } from "@prisma/client";
import { Card } from '@/components/ui/card';
import UserHeader from "./components-local/user-header";
import './user-style.css';
import LoadingComponent from "@/components/LoadingComponent";
import ButtonLinkIcon from "@/components/shared/button-link-icon";
import { useAuth } from "@/auth/context/authContext";

export default function Page() {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState<Partial<Users>>({});
    const [userAnaminese, setUserAnaminese] = useState<Partial<UsersAnaminese> | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const checkUserSession = () => {
            if (!isAuthenticated) {
                router.push("/retiro/login");
            } else {
                setLoading(false);
            }
        }
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user/user-id");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === 200 && data.user) {
                    if (data.user.type === 'admin') {
                        router.push('/administracao');
                    }
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchUserAnaminese = async () => {
            try {
                const response = await fetch("/api/user/user-get-anaminese");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                if (data.status === 200) {
                    setUserAnaminese(data.anaminese);
                } else {
                    setUserAnaminese(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user anaminese data:", error);
                setLoading(false);
            }
        };
        checkUserSession();
        fetchUserData();
        fetchUserAnaminese();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col align-center justify-center text-gray-900">
            <UserHeader user={user} />

            {userAnaminese === null ? (
                <div className="container w-full">
                    <p>
                        Só é possivel realizar a compra do ingresso com todos os dados preenchidos.
                        Complete o cadastro de DADOS ADICIONAIS.
                    </p>
                    <ButtonLinkIcon
                        btnText={"Concluir Cadastro"}
                        btnLink={"/retiro/cadastro/dados-adicionais"}
                    />
                </div>
            ): <Card className="border-0 shadow-0 flex flex-col gap-4 p-4">
                    <ButtonLinkIcon
                btnColor={"bg-primary"}
                btnClass={"p-6 flex items-center justify-between hover:bg-primary-foreground"}
                btnText={"Informações sobre o Ingresso do Retiro de Mulheres 2024"}
                btnLink={"/user/meu-ingresso"}
                icon={BsArrowRightShort}
            />
        </Card> }
        </div>
    );
}
