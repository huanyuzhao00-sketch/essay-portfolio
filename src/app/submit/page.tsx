export default function SubmitPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">投稿</h1>
        <div className="w-6 h-px bg-ochre mx-auto mb-6" />
        <p className="text-sm text-text-muted leading-relaxed">
          夜航船欢迎所有真诚的文字。<br />
          随笔、散文、短篇均可，纯文字中文写作。
        </p>
      </div>

      <form
        action="https://formspree.io/f/PLACEHOLDER"
        method="POST"
        className="space-y-6"
      >
        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            你的名字 / 笔名
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-transparent border-b border-warm-line py-2 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors font-sans"
            placeholder="怎么称呼你"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            邮箱 <span className="text-text-muted font-normal">（不会公开）</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-transparent border-b border-warm-line py-2 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors font-sans"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            作品标题
          </label>
          <input
            type="text"
            name="title"
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
            name="content"
            required
            rows={12}
            className="w-full bg-transparent border border-warm-line p-4 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors leading-[2.2] resize-none"
            placeholder="在这里写下你的文字……"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wider text-text-muted font-sans font-bold mb-2">
            主题分类
          </label>
          <select
            name="theme"
            className="w-full bg-transparent border-b border-warm-line py-2 text-base text-ink focus:outline-none focus:border-ochre transition-colors font-sans"
          >
            <option value="城市">城市</option>
            <option value="食事">食事</option>
            <option value="季节">季节</option>
            <option value="心情">心情</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="px-8 py-2 text-sm text-paper bg-ochre hover:bg-ink transition-colors tracking-widest font-sans font-bold"
          >
            提交
          </button>
          <p className="text-xs text-text-muted mt-4 font-sans">
            投稿通过后将发布在网站上。请确保作品为原创。
          </p>
        </div>
      </form>
    </div>
  )
}
