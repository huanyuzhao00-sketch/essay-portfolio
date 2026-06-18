export default function AboutPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">关于我</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>

      <article>
        <p className="text-base text-ink-light leading-[2.2] text-indent mb-6">
          Doremi。情绪化，喜欢摇滚，挺自我的一个人。
        </p>

        <p className="text-base text-ink-light leading-[2.2] text-indent mb-6">
          写字对我来说不是爱好，也不是工作。就是习惯了。情绪来了，不写憋得慌。写完了也不一定是好了，但至少心里轻了一点。像一个装满了的杯子，倒出来一些，才能继续装别的东西。
        </p>

        <p className="text-base text-ink-light leading-[2.2] text-indent mb-6">
          不写的时候，喜欢睡觉，喜欢和爱人待在一起。能让我真正安静下来的事情不多，这是最管用的两件。
        </p>

        <p className="text-base text-ink-light leading-[2.2] text-indent">
          这个网站是我的夜航船。夜里的船，灯不灭。你什么时候来，它都在。读到了什么算我们的缘分，没读到也没关系。谢谢你来。
        </p>
      </article>
    </div>
  )
}
