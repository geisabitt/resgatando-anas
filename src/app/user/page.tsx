'use client'
import { useState, useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Users } from "@prisma/client";
import { Card } from '@/components/ui/card';
import ButtonLink from "@/components/shared/button-link";
import UserHeader from "./components/user-header";
import './user-style.css';

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
              console.log( "RESPONSE" , response )
              if (!response.ok) {
                  console.log( "RESPONSE" , response )
                  }
                  const data = await response.json();
                  if (data.status === 200) {
                    console.log( "DATA" , data )
              }
              // setLoading(false);
          } catch (error) {
              console.error("Error fetching user data:", error);
              // setLoading(false);
          }
      };
      fetchUserData();
      fetchUserPayments();
    }, []);

    if (loading) {
        return <div className="flex flex-col align-center justify-center">Loading...</div>;
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
                <div className="container-payments">
                    <ButtonLink
                        btnClass={"text-white bg-success700"}
                        btnText={"Realizar pagamento"}
                        btnLink={"/retiro/pagamento"}
                    />
                </div>
            </Card>
        </div>
    );
}
