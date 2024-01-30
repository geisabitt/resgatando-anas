import { HamburguerMenu } from "@/components/HamburgerMenu";
import Header from "@/components/landingPage/header";
import Information from "@/components/landingPage/informations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div><HamburguerMenu/></div>
      <div><Header/></div>
      <div><Information/></div>
      <div  className="flex flex-col items-center justify-center min-w-[340px] max-w-[500px] my-4 mx-auto gap-4">
        <Link className="p-4 flex" href="/retiro/cadastro"><Button className="bg-[#ffa621] rounded-[10px] px-24 py-4">Fazer inscrição</Button></Link>
      </div>
    </main>
  )
}
