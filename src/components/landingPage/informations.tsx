import { BsCalendar, BsPinMapFill, BsTelephoneFill, BsInstagram    } from "react-icons/bs";
import ButtonRegistro from "./buttonRegistro";

export default function Information() {
    return (
        <div className="flex align-center justify-center">
            <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <span className="pt-1"><BsCalendar className='w-6 h-6 text-blue700' /></span>
                    <p>Dias: 25, 26 e 27 de outubro 2024</p>
                </div>
                <div className="flex gap-4">
                    <span className="pt-1"><BsPinMapFill className='w-6 h-6 text-blue700' /></span>
                    <div>
                    <p><span className="font-bold">Local: </span>Chácara Shalon</p>
                    <p><span className="font-bold">Rua: </span>Caminho Morro Grande, 932</p>
                    <p>Barão de Guandu, Nova Iguaçu - RJ</p>
                    </div>
                </div>
                <div className="bg-green400 rounded-lg p-2">
                    <h6 className="flex justify-between text-blue900 font-bold">Investimento:<span>R$ 250,00</span></h6>
                    {/* <div className="flex items-center justify-between bg-red300 rounded-lg p-2">
                    <div>
                        <p className="text-white text-[0.85rem]">Valor promocional no pix </p>
                        <p className="text-white text-[0.85rem]">para as 10 primeiras:</p>
                    </div>
                    <div className="text-right">
                        <p className="relative text-white text-[0.85rem]">
                        <span className="absolute top-1/2 w-14 h-[1px] right-0 bg-white transform -translate-y-1/2"></span>
                        R$ 250,00
                        </p>
                        <h6 className="text-white">R$ 180,00</h6>
                    </div>
                    </div> */}
                </div>
                <div  className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                    <span className="pt-1"><BsPinMapFill className='w-6 h-6 text-blue700' /></span>
                    <p className="font-bold">Local de saída do retiro: </p>
                </div>
                    <div className="flex flex-col gap-2">
                    <p className="font-bold text-blue700">Igreja - Comunidade Cristã Terra Fértil</p>
                    <p>Rua: Av Fuscão , 255 - Corumbá</p>
                    <p>Nova Iguaçu - RJ</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="pt-1"><BsTelephoneFill className='w-6 h-6 text-blue700' /></span>
                    <h6 className="font-bold">Dúvidas e informações:</h6>
                </div>
                <div>
                    <p className="flex justify-between">Pra. Roberta: <span>(21) 97026-1802</span></p>
                    <p className="flex justify-between">Pra. Glória: <span>(21) 97068-6842</span></p>
                    <p className="mt-4 font-bold">Informações adicionais:</p>
                    <p className="flex justify-between">Diac. Camila: <span>(21) 99363-6957</span></p>
                </div>
                </div>
                <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <h6 className="font-bold">Nos siga nas redes sociais</h6>
                </div>
                <div className="flex items-center gap-4">
                    <span className="pt-1"><BsInstagram className='w-6 h-6 text-blue700' /></span>
                    <p>@resgatandoanas</p>
                </div>
                </div>
                    <ButtonRegistro/>
            </div>
        </div>
    );
}