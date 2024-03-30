import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'API Retiro',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={notoSans.className}>
      <div>{children}</div>
      </body>
    </html>
  )
}
