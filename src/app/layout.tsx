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
  metadataBase: new URL('https://www.doremi.xin'),
  title: {
    default: '夜航船 · Doremi的随笔集',
    template: '%s · 夜航船',
  },
  description: 'Doremi的短篇随笔作品集——记录城市、季节与日常的缝隙。纯文字中文写作，极简阅读体验。',
  keywords: ['随笔', '散文', '短篇', '写作', '中文', '文学', 'Doremi', '夜航船'],
  authors: [{ name: 'Doremi' }],
  openGraph: {
    title: '夜航船 · Doremi的随笔集',
    description: 'Doremi的短篇随笔作品集——记录城市、季节与日常的缝隙',
    type: 'website',
    locale: 'zh_CN',
    siteName: '夜航船',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={notoSerif.variable}>
      <body className="min-h-screen flex flex-col font-serif">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js" />
      </body>
    </html>
  )
}
