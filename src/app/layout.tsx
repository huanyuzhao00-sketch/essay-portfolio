import type { Metadata } from 'next'
import { Noto_Serif_SC } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: '夜航船 · 随笔集',
  description: '陈默的短篇随笔作品集',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={notoSerif.variable}>
      <body className="min-h-screen font-serif">{children}</body>
    </html>
  )
}
