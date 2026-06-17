'use client'

import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTheme, setNewTheme] = useState('城市')
  const [newSummary, setNewSummary] = useState('')
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('admin') === 'doremi') {
      localStorage.setItem('admin_doremi', '1')
      setIsAdmin(true)
    } else if (localStorage.getItem('admin_doremi') === '1') {
      setIsAdmin(true)
    }
  }, [])

  function generateMarkdown() {
    if (!newTitle) return ''
    return `---
title: ${newTitle}
date: ${newDate}
theme: ${newTheme}
summary: ${newSummary}
---

`
  }

  function copyMarkdown() {
    navigator.clipboard.writeText(generateMarkdown())
  }

  if (!isAdmin) {
    return (
      <div className="max-w-reading mx-auto px-5 md:px-12 py-32 text-center">
        <p className="text-text-muted font-sans">需要管理员权限</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">管理后台</h1>
        <div className="w-6 h-px bg-ochre mx-auto mb-6" />
      </div>

      {/* Quick create markdown */}
      <section className="mb-10 p-6 border border-warm-line">
        <h2 className="text-sm tracking-wider text-text-muted font-sans font-bold mb-4 text-center">
          快速生成 .md 文件
        </h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
              placeholder="标题" className="flex-1 bg-transparent border-b border-warm-line py-1 text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre" />
            <input value={newDate} onChange={e => setNewDate(e.target.value)}
              type="date" className="w-32 bg-transparent border-b border-warm-line py-1 text-sm text-ink focus:outline-none focus:border-ochre font-sans" />
          </div>
          <div className="flex gap-3">
            <select value={newTheme} onChange={e => setNewTheme(e.target.value)}
              className="w-24 bg-transparent border-b border-warm-line py-1 text-sm text-ink focus:outline-none focus:border-ochre font-sans">
              <option>城市</option><option>食事</option><option>季节</option><option>心情</option><option>其他</option>
            </select>
            <input value={newSummary} onChange={e => setNewSummary(e.target.value)}
              placeholder="摘要（一句话）" className="flex-1 bg-transparent border-b border-warm-line py-1 text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre" />
          </div>
          <div className="text-center pt-2">
            <button onClick={copyMarkdown}
              className="px-4 py-1 text-xs text-paper bg-ochre hover:bg-ink transition-colors font-sans font-bold tracking-wider">
              复制 Markdown
            </button>
          </div>
        </div>
      </section>

      {/* Link to Feishu submissions */}
      <section className="p-6 border border-warm-line text-center">
        <h2 className="text-sm tracking-wider text-text-muted font-sans font-bold mb-3">
          查看投稿
        </h2>
        <a
          href="https://ycnje5rm25oi.feishu.cn/wiki/TsVxw7jaBi8hsmkLCS1cD7AYnYg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ochre hover:text-ink transition-colors font-sans"
        >
          打开飞书多维表格查看所有投稿 →
        </a>
        <p className="text-xs text-text-muted mt-2 font-sans">
          读者提交的稿件会实时出现在飞书表格中
        </p>
      </section>
    </div>
  )
}
