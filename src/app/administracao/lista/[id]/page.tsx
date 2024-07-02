'use client';
import { PaymentUser, Users, UsersAnaminese } from "@prisma/client";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: any } }) => {
    const [user, setUser] = useState<Partial<Users> | null>(null);
    const [userAnaminese, setUserAnaminese] = useState<Partial<UsersAnaminese> | null>(null);
    const [userPayment, setUserPayment] = useState<Partial<PaymentUser> | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/adm/get-user/${params.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('setUser', data);

                if (data.status === 200) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchAnaminese = async () => {
            try {
                const response = await fetch(`/api/user/user-get-anaminese?id=${params.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('setUserAnaminese', data);

                if (data.status === 200) {
                    setUserAnaminese(data.userAnaminese);
                } else {
                    setUserAnaminese(null);
                }
            } catch (error) {
                console.error("Error fetching user anaminese data:", error);
            }
        };

        const fetchPayment = async () => {
            try {
                const response = await fetch(`/api/user/get-user-payments?id=${params.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);

                if (data.status === 200) {
                    setUserPayment(data.userPayment);
                } else {
                    setUserPayment(null);
                }
            } catch (error) {
                console.error("Error fetching user payment data:", error);
            }
        };

        fetchUser();
        fetchAnaminese();
        fetchPayment();
    }, [params.id]);

    return (
        <div className="flex flex-col space-y-3">
        </div>
    );
}

export default Page;
