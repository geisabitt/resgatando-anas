import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ButtonIndex from '@/components/ButtonIndex'
import { HamburguerMenu } from "@/components/HamburgerMenu";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retiro Descencendo do Salto',
  description: 'Redito produzido pelo projeto de mulheres Resgatando Anas Você é Terra Fértil, Nova Iguaçú',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
      <div className='w-[100%] bg-[#E6C6C8] fixed top-0 z-50' >
            <div className='w-[80%] mx-auto' >
                <div className='flex justify-end items-center gap-4 p-4'><HamburguerMenu/></div>
          </div>
      </div>
      <div className='my-8'>{children}</div></body>
      <ButtonIndex/>
    </html>
  )
}
