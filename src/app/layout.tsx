import type { Metadata } from 'next'
import { Noto_Serif_SC } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: {
    default: '夜航船 · 随笔集',
    template: '%s · 夜航船',
  },
  description: '陈默的短篇随笔作品集——记录城市、季节与日常的缝隙',
  openGraph: {
    title: '夜航船 · 随笔集',
    description: '陈默的短篇随笔作品集',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={notoSerif.variable}>
      <body className="min-h-screen flex flex-col font-serif">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
