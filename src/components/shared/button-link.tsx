import Link from "next/link";
import { IconType } from 'react-icons';

type ButtonProps = {
    btnText: string
    btnLink: string
    btnClass?: string
    icon?: IconType
}

export default function ButtonLink({btnText, btnClass, btnLink, icon: Icon}: Readonly<ButtonProps>) {
    return (
        <Link className={`w-full py-4 rounded ${btnClass ?? 'bg-success700'}`} href={btnLink}>{btnText} {Icon && <Icon className="w-8 h-8" />}</Link>
    );
}