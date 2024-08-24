import Link from "next/link";

type ButtonProps = {
    btnText: string
    btnLink: string
    btnColor?: string
    btnClass?: string
}

export default function ButtonLink({btnText, btnClass, btnColor, btnLink}: Readonly<ButtonProps>) {
    return (
        <Link className={`w-full flex mt-2 gap-6 py-2 px-6 rounded items-center text-center justify-center ${btnClass} ${btnColor ?? 'bg-success700'}`} href={btnLink}>{btnText}</Link>
    );
}