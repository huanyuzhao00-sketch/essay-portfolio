export default function ContactPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">联系</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>

      <div className="space-y-6 text-center">
        <div>
          <p className="text-xs tracking-[0.2em] text-text-muted font-sans mb-2">邮箱</p>
          <a href="mailto:your-email@example.com" className="text-base text-ink hover:text-ochre transition-colors">
            your-email@example.com
          </a>
        </div>
        <div className="w-12 h-px bg-warm-line mx-auto" />
        <div>
          <p className="text-xs tracking-[0.2em] text-text-muted font-sans mb-3">社交</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-sm text-text-muted hover:text-ochre transition-colors font-sans">豆瓣</a>
            <a href="#" className="text-sm text-text-muted hover:text-ochre transition-colors font-sans">即刻</a>
            <a href="#" className="text-sm text-text-muted hover:text-ochre transition-colors font-sans">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  )
}
