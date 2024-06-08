'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";
import { Users } from "@prisma/client";

function capitalizeWords(name:string) {
    return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export default function UserHeader() {
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

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="flex flex-col align-center justify-center">Loading...</div>;
    }

    return (
        <>
            {user && (
                <div className="text-center mb-2">
                    <div className="inline-block p-6 rounded-full bg-primary mb-2">
                        <BsFillPersonFill className="w-6 h-6 text-gray-900" />
                    </div>
                    <p className="mb-2 font-bold">{capitalizeWords(user.name!)}</p>
                    <Link className="px-4 py-1 rounded-full bg-primary mb-2 px12" href="/api/user/logout">Sair</Link>
                </div>
            )}
        </>
    )
}
