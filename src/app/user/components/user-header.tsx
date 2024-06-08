'use client'
import { BsFillPersonFill } from "react-icons/bs";
import { Users } from "@prisma/client";
import Link from "next/link";

function capitalizeWords(name: string) {
    return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export default function UserHeader({ user }: { user: Partial<Users> }) {
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
    );
}
