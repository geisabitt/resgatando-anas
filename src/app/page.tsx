import Header from "@/components/landingPage/header";
import Information from "@/components/landingPage/informations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div><Header/></div>
      <div><Information/></div>
      <div  className="flex flex-col items-center justify-center min-w-[340px] max-w-[500px] my-4 mx-auto gap-2">
        <Link className="flex" href="/retiro/pagamento"><Button className="bg-[#ffa621] hover:bg-[#996c28] rounded-[10px] px-24 py-4">Pagamento</Button></Link>
        <Link className="flex" href="/retiro/pagamentoPix"><Button className="bg-[#ffa621] hover:bg-[#996c28] rounded-[10px] px-24 py-4">Pagamento Pix</Button></Link>
      </div>
    </main>
  )
}
