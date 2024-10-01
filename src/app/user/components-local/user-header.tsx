'use client';
import axios from 'axios';
import React, { useEffect } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { Users } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useAuth } from '@/auth/context/authContext';

function capitalizeWords(name: string) {
    return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export default function UserHeader({ user }: { user: Partial<Users> }) {
    const router = useRouter();
    const { isAuthenticated,checkSession } = useAuth();

    useEffect(() => {
        const checkUserSession = () => {
            if (!isAuthenticated) {
                router.push('/retiro/login');
            }
        };
        checkUserSession();
    }, [isAuthenticated, router]);

    const handleLogout = async () => {
      try {
        const response = await axios.post('/api/user/logout2');
        if (response.status === 200) {
          checkSession();
          router.push('/retiro/login');
        }
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    };

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
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>
            )}
        </>
    );
}