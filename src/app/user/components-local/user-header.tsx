'use client';
import { BsFillPersonFill } from "react-icons/bs";
import { Users } from "@prisma/client";
import { useAuth } from '@/auth/context/authContext';

function capitalizeWords(name: string) {
    return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export default function UserHeader({ user }: { user: Partial<Users> }) {
    const { logout } = useAuth();

    return (
        <>
            {user && (
                <div className="text-center mb-2">
                    <div className="inline-block p-6 rounded-full bg-primary mb-2">
                        <BsFillPersonFill className="w-6 h-6 text-gray-900" />
                    </div>
                    <p className="mb-2 font-bold">
                        {user.name ? capitalizeWords(user.name) : "Erro ao buscar o nome"}
                    </p>
                    <button
                        className="px-4 py-1 rounded-full bg-primary mb-2 px12"
                        onClick={logout}
                    >
                        Sair
                    </button>
                </div>
            )}
        </>
    );
}