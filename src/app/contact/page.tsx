export default function ContactPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">联系</h1>
        <div className="w-6 h-px bg-ochre mx-auto mb-6" />
        <p className="text-sm text-text-muted leading-loose max-w-xs mx-auto">
          不论是想说点什么，还是想投稿，<br />都很欢迎你的来信。
        </p>
      </div>

      <div className="text-center">
        <p className="text-xs tracking-[0.2em] text-text-muted font-sans font-bold mb-2">
          邮箱
        </p>
        <a
          href="mailto:huanyuzhao00@gmail.com"
          className="text-base text-ink hover:text-ochre transition-colors"
        >
          huanyuzhao00@gmail.com
        </a>
        <p className="text-xs text-text-muted mt-4 font-sans">
          一般 48 小时内回复
        </p>
      </div>
    </div>
  )
}
