import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '夜航船 · 随笔集',
  description: '陈默的短篇随笔作品集',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
