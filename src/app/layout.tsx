import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ButtonIndex from '@/components/ButtonIndex'
import FooterMenu from '@/components/FooterMenu';
import { HeaderMenu } from '@/components/HeaderMenu';
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
      <HeaderMenu/>
      <div className='my-20'>{children}</div>
      <ButtonIndex/>
      <FooterMenu/>
      </body>
    </html>
  )
}
