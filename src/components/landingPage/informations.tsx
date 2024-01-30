import { FaRegCalendar } from "react-icons/fa6";
import { IoIosPin } from "react-icons/io";
export default function Information() {
    return (
        <>
            <div className="p-6 flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                    <span><FaRegCalendar className='w-4 h-4' /></span>
                    <h3>Dias: 25, 26 e 27 de outubro 2024</h3></div>
                <div className="flex gap-4"><span className="pt-1">
                    <IoIosPin className='w-4 h-4' /></span>
                    <h3><p>Chácara Shalon</p>
                    <p>Rua: Caminho Morro Grande, 932</p>
                    <p>Barão de Guandu, Nova Iguaçu - RJ</p></h3></div>
            </div>
        </>
    );
}