'use client';
import ButtonBack from "@/components/shared/btn-back";
import { Button, Input } from "@/components/ui";
import { PaymentUser, Users, UsersAnaminese } from "@prisma/client";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: any } }) => {
    const [user, setUser] = useState<Partial<Users> | null>(null);
    const [userAnaminese, setUserAnaminese] = useState<Partial<UsersAnaminese> | null>(null);
    const [userPayment, setUserPayment] = useState<Partial<PaymentUser[]> | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Função separada para carregar os dados de pagamento
    const fetchPayments = async (userId: string) => {
        try {
            const response = await fetch(`/api/adm/get-user/${params.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.status === 200) {
                setUserPayment(data.payments);
            }
        } catch (error) {
            console.error("Error fetching payment data:", error);
        }
    };

    // Função para carregar os dados do usuário e anamnese
    const fetchUser = async () => {
        try {
            const response = await fetch(`/api/adm/get-user/${params.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data.status === 200) {
                setUser(data.user);
                setUserAnaminese(data.anaminese);
                setUserPayment(data.payments);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUser();

        // Inicia o polling para buscar os dados de pagamento a cada 1 minuto (60000 ms)
        const intervalId = setInterval(() => {
            fetchPayments(params.id);
        }, 60000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(intervalId);
    }, [params.id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        if (user) {
            try {
                const response = await fetch(`/api/adm/edit-user?id=${params.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (!response.ok) {
                    throw new Error('Failed to update user');
                }

                const data = await response.json();
                setUser(data.updatedUser);
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    };

    return (
        <div className="w-[90%] mx-auto my-0 flex flex-col space-y-3">
            <div id="user">
                <h6 className="font-bold text-center pb-4">Dados Pessoais</h6>
                {isEditing ? (
                    <form onSubmit={handleSave} className="flex flex-col gap-2">
                        <Input
                            type="text"
                            value={user?.name || ''}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            placeholder="Nome"
                            className="border p-2"
                        />
                        <Input
                            type="email"
                            value={user?.email || ''}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            className="border p-2"
                        />
                        <Input
                            type="text"
                            value={user?.telefone || ''}
                            onChange={(e) => setUser({ ...user, telefone: e.target.value })}
                            placeholder="Telefone"
                            className="border p-2"
                        />
                        <Input
                            type="text"
                            value={user?.rg || ''}
                            onChange={(e) => setUser({ ...user, rg: e.target.value })}
                            placeholder="RG"
                            className="border p-2"
                        />
                        <Button type="submit" className="bg-blue-500 text-white p-2">Salvar</Button>
                        <Button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2">Cancelar</Button>
                    </form>
                ) : (
                <div>
                    <p><span className="font-bold">Nome: </span>{user?.name}</p>
                    <p><span className="font-bold">Email: </span>{user?.email}</p>
                    <p><span className="font-bold">CPF: </span>{user?.cpf}</p>
                    <p><span className="font-bold">Data de nascimento: </span>{user?.data_de_nascimento}</p>
                    <p><span className="font-bold">RG: </span>{user?.rg}</p>
                    <p><span className="font-bold">Telefone: </span>{user?.telefone}</p>
                    <p><span className="font-bold">Telefone de emergência: </span>{user?.telefone_emergencia}</p>
                    <button onClick={handleEdit} className="bg-blue-500 text-white p-2">Editar</button>
                </div>
            )}
            </div>
            <div id="anaminese">
                <h6 className="font-bold text-center pb-4">Anaminese</h6>
                <p><span className="font-bold">Possui doença: </span>{userAnaminese?.possui_doenca}</p>
                <p><span className="font-bold">Qual doença: </span>{userAnaminese?.qual_doenca}</p>
                <p><span className="font-bold">Faz uso de medicamento: </span>{userAnaminese?.faz_uso_medicamento}</p>
                <p><span className="font-bold">Qual medicamento: </span>{userAnaminese?.qual_medicamento}</p>
                <p><span className="font-bold">Alergia a medicamento: </span>{userAnaminese?.alergia_medicamento}</p>
                <p><span className="font-bold">Alergia a qual medicamento: </span>{userAnaminese?.alergia_qual_medicamento}</p>
                <p><span className="font-bold">Restrição alimentar: </span>{userAnaminese?.restricao_alimentar}</p>
                <p><span className="font-bold">Quais alimentos: </span>{userAnaminese?.quais_alimentos}</p>
                <p><span className="font-bold">Tamanho da blusa: </span>{userAnaminese?.tamanho_blusa}</p>
            </div>
            <div id="payments">
                {userPayment?.map((payment) => (
                    <div key={payment?.id} className="border p-2 mb-2">
                        <p><span className="font-bold">Identificador: </span>{payment?.paymentId}</p>
                        <p><span className="font-bold">Descrição: </span>{payment?.paymentDescription}</p>
                        <p><span className="font-bold">Status: </span>{payment?.paymentStatus}</p>
                        {/* <p><span className="font-bold">Tipo: </span>{payment?.paymentType}</p> */}
                        <p><span className="font-bold">Ativo: </span>{payment?.active ? "Sim" : "Não"}</p>
                    </div>
                ))}
            </div>
            <ButtonBack/>
        </div>
    );
}

export default Page;
