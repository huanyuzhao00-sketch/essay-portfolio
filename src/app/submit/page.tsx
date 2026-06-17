'use client'

import { useState } from 'react'

export default function SubmitPage() {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = `作者：${name}\n邮箱：${email}\n标题：${title}\n\n${content}`

    // If short enough, open QQ Mail compose directly
    if (body.length < 1000) {
      const url = `https://mail.qq.com/cgi-bin/compose?to=huanyuzhao00@gmail.com&subject=${encodeURIComponent('投稿：' + title)}&body=${encodeURIComponent(body)}`
      window.open(url, '_blank')
    } else {
      // Long content: copy to clipboard, then open QQ Mail
      navigator.clipboard.writeText(body).then(() => {
        showToast('稿件已复制，请在QQ邮箱中粘贴（Ctrl+V）')
      }).catch(() => {
        showToast('稿件较长，请手动复制')
      })
      window.open('https://mail.qq.com', '_blank')
    }
  }

  function showToast(msg: string) {
    const toast = document.createElement('div')
    toast.textContent = msg
    toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2d2c28;color:#faf9f6;padding:12px 24px;font-size:13px;z-index:9999;font-family:sans-serif'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 4000)
  }

  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">投稿</h1>
        <div className="w-6 h-px bg-ochre mx-auto mb-6" />
        <p className="text-sm text-text-muted leading-relaxed">
          夜航船欢迎所有真诚的文字。<br />
          随笔、散文、短篇均可，目前仅接受中文投稿哦。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            你的名字 / 笔名
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full bg-transparent border-b border-warm-line py-2 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors font-sans"
            placeholder="怎么称呼你"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            你的邮箱 <span className="text-text-muted font-normal">（方便我们回复你）</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border-b border-warm-line py-2 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors font-sans"
            placeholder="your@qq.com"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            作品标题
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full bg-transparent border-b border-warm-line py-2 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors"
            placeholder="给你的随笔起个名字"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            正文
          </label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={12}
            className="w-full bg-transparent border border-warm-line p-4 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors leading-[2.2] resize-none"
            placeholder="在这里写下你的文字……"
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="px-8 py-2 text-sm text-paper bg-ochre hover:bg-ink transition-colors tracking-widest font-sans font-bold"
          >
            提交
          </button>
          <p className="text-xs text-text-muted mt-4 font-sans">
            点击提交后将自动跳转至 QQ 邮箱发送，无需手动复制。
          </p>
        </div>
      </form>
    </div>
  )
}
