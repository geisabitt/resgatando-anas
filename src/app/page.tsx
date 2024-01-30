import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Retido Descendo do salto</h1>
        <p>Realizado pelo projeto de muheres Resgatando Anas Você é Terra Fértil</p>
      </div>
      <div  className="flex flex-col items-center justify-center min-w-[340px] max-w-[500px] my-20 mx-auto gap-4">
        <Link className="p-4 bg-accent rounded" href="/retiro/login">Retiro Login</Link>
        <Link className="p-4 bg-accent rounded" href="/retiro/cadastro">Retiro Cadastro</Link>
      </div>
    </main>
  )
}
