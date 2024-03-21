import { FaRegCalendar } from "react-icons/fa6";
import { IoIosPin } from "react-icons/io";
import { AiFillPhone } from "react-icons/ai";
import { LuInstagram } from "react-icons/lu";

import ButtonRegistro from "./buttonRegistro";
export default function Information() {
    return (
        <div className="flex align-center justify-center">
            <div className="p-6 flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                    <span><FaRegCalendar className='w-4 h-4 text-primary' /></span>
                    <p>Dias: 25, 26 e 27 de outubro 2024</p></div>
                <div className="flex gap-4">
                    <span className="pt-1"><IoIosPin className='w-4 h-4 text-success' /></span>
                    <div>
                    <p>Local: Chácara Shalon</p>
                    <p>Rua: Caminho Morro Grande, 932</p>
                    <p>Barão de Guandu, Nova Iguaçu - RJ</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className="pt-1"><IoIosPin className='w-4 h-4 text-success' /></span>
                    <div>
                    <p>Local de saída do retiro: </p>
                    <p>Igreja - Comunidade Cristã Terra Fértil</p>
                    <p>Rua: Av Fuscão , 255</p>
                    <p>Corumbá, Nova Iguaçu - RJ.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className="pt-1"><LuInstagram className='w-4 h-4 text-primary' /></span>
                    <div>
                    <p>Contato e redes sociais</p>
                    <p>Siga-nos: @resgatandoanas</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className="pt-1"><AiFillPhone className='w-4 h-4 text-primary' /></span>
                    <div>
                    <p>Dúvidas e informações:</p>
                    <p>Pra. Roberta (21) 97026-1802</p>
                    <p>Pra. Glória: (21) 97068-6842</p>
                    <p className="mt-4">Informações adicionais:</p>
                    <p>Diac. Camila (21) 993636957.
</p>
                    </div>
                </div>
                <ButtonRegistro/>
            </div>
        </div>
    );
}