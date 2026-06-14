export default function AboutPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">关于我</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>

      <article className="prose-custom">
        <p className="text-base text-ink-light leading-[2.2] text-indent mb-6">
          Doremi，九零后。生于南方，现居上海。
        </p>
        <p className="text-base text-ink-light leading-[2.2] text-indent mb-6">
          白天在一家互联网公司做产品，晚上和周末写字。写城市里的日常，写吃过的食物，写遇到过的人，写那些不说出来就会忘记的瞬间。
        </p>
        <p className="text-base text-ink-light leading-[2.2] text-indent">
          相信文字可以慢下来。在这个什么都很快的时代，慢慢地写完一段话，是少数几个还属于自己的时刻。
        </p>
      </article>
    </div>
  )
}
