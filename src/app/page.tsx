import Link from 'next/link'
import { getAllEssays, getAllThemes } from '@/lib/essays'
import EssayCard from '@/components/EssayCard'

export default function HomePage() {
  const themes = getAllThemes()
  const recentEssays = getAllEssays().slice(0, 5)

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      {/* Hero */}
      <section className="text-center mb-16">
        <p className="text-[10px] tracking-[0.4em] text-text-muted font-sans mb-8">Doremi的随笔集</p>
        <h1 className="text-3xl md:text-4xl text-ink tracking-[0.15em] mb-6">夜航船</h1>
        <div className="w-8 h-px bg-ochre mx-auto mb-6" />
        <p className="text-sm text-text-muted leading-loose">
          九零后写作者<br />记录城市、季节与日常的缝隙
        </p>
      </section>

      {/* Theme tags */}
      <section className="mb-12">
        <div className="w-full h-px bg-warm-line mb-6" />
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {themes.map(theme => (
            <Link
              key={theme}
              href={`/essays?theme=${encodeURIComponent(theme)}`}
              className="text-sm text-text-muted hover:text-ochre transition-colors font-sans tracking-wider"
            >
              {theme}
            </Link>
          ))}
        </div>
        <div className="w-full h-px bg-warm-line mt-6" />
      </section>

      {/* Recent essays */}
      <section>
        <p className="text-[10px] tracking-[0.3em] text-text-muted font-sans mb-6 text-center">最新随笔</p>
        <div className="divide-y divide-warm-line">
          {recentEssays.map(essay => (
            <EssayCard key={`${essay.theme}/${essay.slug}`} essay={essay} />
          ))}
        </div>
      </section>

      {/* Link to all essays */}
      <div className="text-center mt-10">
        <Link href="/essays" className="text-xs text-text-muted hover:text-ochre transition-colors tracking-wider font-sans">
          查看全部作品 →
        </Link>
      </div>
    </div>
  )
}
