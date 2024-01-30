import Link from "next/link";

export default function User() {
  return (
    <div className="flex align-center justify-center p-20">
        <h1>Pagina do usuario</h1>
        <Link className="p-4 bg-accent rounded" href="/api/user/logout">Sair</Link>
    </div>
  )
}