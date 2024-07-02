'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { BsFillEyeFill } from "react-icons/bs";
import { useState, useEffect } from "react";

import LoadingComponent from "@/components/LoadingComponent";
import Link from "next/link";
import { Users } from "@prisma/client";

export default function Page() {
    const [allUser, setAllUser] = useState<Partial<Users>[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllusers = async () => {
            try {
                const response = await fetch("/api/adm/get-all-users");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.allUser)

                if (data.status === 200) {
                    setAllUser(data.allUser);
                    console.log("allUser",allUser);
                } else {
                    setAllUser(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user anaminese data:", error);
                setLoading(false);
            }
        };
        fetchAllusers();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
            <Table className="max-w-[380px] w-[90%}">
            <TableHeader>
                <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefones</TableHead>
                <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allUser ? allUser.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="flex flex-col">{user.telefone} <span>{user.telefone_emergencia}</span></TableCell>
                    <TableCell>
                        <Link className="flex gap-2 items-center" href={`/administracao/lista/${user.id}`}>Detalhes<BsFillEyeFill className="text-primary w-6 h-6"/></Link></TableCell>
                </TableRow>
                )): <TableCaption>Não Foi possivel carregar a lista</TableCaption>}
            </TableBody>
            </Table>
    );
}
