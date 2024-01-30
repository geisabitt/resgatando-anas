import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ButtonIndex from '@/components/ButtonIndex'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retiro Descencendo do Salto',
  description: 'Redito produzido pelo projeto de mulheres Resgatando Anas Você é Terra Fértil, Nova Iguaçú',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
      <ButtonIndex/>
    </html>
  )
}
