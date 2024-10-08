import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import FooterMenu from '@/components/FooterMenu';
import { HeaderMenu } from '@/components/HeaderMenu';
import { AuthProvider } from '@/auth/context/authContext';
const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retiro Descendo do Salto',
  description: 'Redito produzido pelo projeto de mulheres Resgatando Anas Você é Terra Fértil, Nova Iguaçú',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={notoSans.className}>
      <HeaderMenu/>
        <AuthProvider>
          <div className='max-w-[380px] my-20 mx-auto'>{children}</div>
          <FooterMenu/>
        </AuthProvider>
      </body>
    </html>
  )
}
