export default function SubmitPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-10">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">投稿</h1>
        <div className="w-6 h-px bg-ochre mx-auto mb-6" />
        <p className="text-sm text-text-muted leading-relaxed">
          夜航船欢迎所有真诚的文字。<br />
          随笔、散文、短篇均可，目前仅接受中文投稿。
        </p>
      </div>

      <iframe
        src="https://ycnje5rm25oi.feishu.cn/share/base/form/shrcnuIngsFF9xXm7KMdUOHgo1f"
        className="w-full border border-warm-line"
        style={{ minHeight: '600px' }}
        title="投稿表单"
      />
    </div>
  )
}
