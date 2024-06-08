import './user-style.css'
import UserHeader from "./components/user-header";
import { Card } from '@/components/ui/card';
import { BsArrowRightShort } from "react-icons/bs";
import ButtonLink from "@/components/shared/button-link";


export default function Page() {

  return (
    <div className="flex flex-col align-center justify-center text-gray-900">
        <UserHeader/>
        <Card className="border-0 shadow-0 flex flex-col gap-4 p-4">
            <ButtonLink btnClass={"p-6 flex items-center justify-between bg-primary hover:bg-primary-foreground"} btnText={"Dados Pessoais"} btnLink={"/user/edit-dados-pessoais"} icon={BsArrowRightShort}/>
            <ButtonLink btnClass={"p-6 flex items-center justify-between bg-primary hover:bg-primary-foreground"} btnText={"Dados Adicionais"} btnLink={"/user/edit-dados-adicionais"} icon={BsArrowRightShort}/>
          <div className="container-payments">
            <ButtonLink btnClass={"text-white bg-success700"} btnText={"Realizar pagamento"} btnLink={"/retiro/pagamento"}/>
          </div>
        </Card>
    </div>
  )
}