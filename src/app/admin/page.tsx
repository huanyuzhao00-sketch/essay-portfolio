'use client'

import { useState, useEffect } from 'react'

interface ReviewItem {
  id: string
  author: string
  title: string
  status: '待审' | '通过' | '退回'
  date: string
}

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newTheme, setNewTheme] = useState('城市')
  const [newSummary, setNewSummary] = useState('')
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('admin') === 'doremi') {
      setIsAdmin(true)
      const saved = localStorage.getItem('doremi_reviews')
      if (saved) setReviews(JSON.parse(saved))
    }
  }, [])

  function saveReviews(updated: ReviewItem[]) {
    setReviews(updated)
    localStorage.setItem('doremi_reviews', JSON.stringify(updated))
  }

  function addReview() {
    if (!newAuthor || !newTitle) return
    const item: ReviewItem = {
      id: Date.now().toString(),
      author: newAuthor,
      title: newTitle,
      status: '待审',
      date: new Date().toISOString().slice(0, 10),
    }
    saveReviews([item, ...reviews])
    setNewAuthor('')
    setNewTitle('')
  }

  function updateStatus(id: string, status: ReviewItem['status']) {
    saveReviews(reviews.map(r => r.id === id ? { ...r, status } : r))
  }

  function deleteReview(id: string) {
    saveReviews(reviews.filter(r => r.id !== id))
  }

  function generateMarkdown() {
    if (!newTitle) return ''
    const slug = newTitle
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

  const pending = reviews.filter(r => r.status === '待审').length
  const approved = reviews.filter(r => r.status === '通过').length

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
        <div className="flex justify-center gap-8 font-sans text-sm text-text-muted">
          <span>待审 <b className="text-ochre">{pending}</b></span>
          <span>通过 <b className="text-ink">{approved}</b></span>
          <span>总计 <b>{reviews.length}</b></span>
        </div>
      </div>

      {/* Quick create markdown */}
      <section className="mb-12 p-6 border border-warm-line">
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
            <span className="text-xs text-text-muted ml-3 font-sans">
              复制后去 GitHub 新建文件
            </span>
          </div>
        </div>
      </section>

      {/* Review list */}
      <section>
        <h2 className="text-sm tracking-wider text-text-muted font-sans font-bold mb-4 text-center">
          投稿审核
        </h2>

        {/* Add new review item */}
        <div className="flex gap-2 mb-6">
          <input value={newAuthor} onChange={e => setNewAuthor(e.target.value)}
            placeholder="作者" className="w-24 bg-transparent border-b border-warm-line py-1 text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre font-sans" />
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
            placeholder="标题" className="flex-1 bg-transparent border-b border-warm-line py-1 text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre" />
          <button onClick={addReview}
            className="px-3 py-1 text-xs text-paper bg-ochre hover:bg-ink transition-colors font-sans font-bold shrink-0">
            添加
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-xs text-text-muted font-sans">暂无记录</p>
        ) : (
          <div className="divide-y divide-warm-line">
            {reviews.map(r => (
              <div key={r.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-sm text-ink block truncate">{r.title}</span>
                  <span className="text-xs text-text-muted font-sans">{r.author} · {r.date}</span>
                </div>
                <div className="flex gap-2 shrink-0">
                  {(['待审', '通过', '退回'] as const).map(s => (
                    <button key={s} onClick={() => updateStatus(r.id, s)}
                      className={`text-xs px-2 py-0.5 font-sans transition-colors ${
                        r.status === s
                          ? s === '通过' ? 'bg-green-100 text-green-700'
                          : s === '退回' ? 'bg-red-100 text-red-600'
                          : 'bg-ochre/20 text-ochre'
                          : 'text-text-muted hover:text-ink'
                      }`}>
                      {s}
                    </button>
                  ))}
                  <button onClick={() => deleteReview(r.id)}
                    className="text-xs text-text-muted hover:text-red-500 ml-1 font-sans">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
