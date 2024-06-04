import { Button } from "@/components/ui";
import Link from "next/link";

type ButtonProps = {
    btnText: string
    btnLink: string
    btnColor?: string
}

export default function ButtonLink({btnText, btnColor, btnLink}: Readonly<ButtonProps>) {
    return (
        <Link className={`w-full py-4 rounded text-[1.125rem] text-center text-white font-bold ${btnColor || 'bg-success700'}`} href={btnLink}>{btnText}</Link>
    );
}