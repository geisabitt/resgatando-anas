import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { BsGrid1X2Fill } from "react-icons/bs";
export default function FooterMenu() {
    return (
    <div className='w-[100%] bg-[#E6C6C8] fixed bottom-0 z-50 text-[#FDF9FA]' >
        <div className='w-[90%] mx-auto' >
            <div className='flex justify-between items-center gap-4 p-2'>
            <Link className="flex flex-col items-center" href="/"><IoHomeSharp className="text-[1.5rem]" /><span>Home</span></Link>
            <Link className="flex flex-col items-center" href="#galeria"><BsGrid1X2Fill className="text-[1.5rem] rotate-90"/><span>Galeria</span></Link>
            {/* <Link className="flex flex-col items-center" href="/"><IoHeartCircle className="text-[1.5rem]" /><span>Colabore</span></Link> */}
            </div>
        </div>
    </div>
    );
}