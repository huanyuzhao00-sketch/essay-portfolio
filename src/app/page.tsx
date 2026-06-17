import Link from 'next/link'
import { getAllEssays, getAllThemes } from '@/lib/essays'
import EssayCard from '@/components/EssayCard'

export default function HomePage() {
  const themes = getAllThemes()
  const recentEssays = getAllEssays().slice(0, 5)

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-20 md:py-28">
      {/* Hero */}
      <section className="text-center mb-20">
        <p className="text-[10px] tracking-[0.5em] text-text-muted font-sans font-bold mb-10">
          DOREMI
        </p>
        <h1 className="text-3xl md:text-4xl text-ink tracking-[0.2em] mb-8">夜航船</h1>
        <div className="w-10 h-px bg-ochre mx-auto mb-8" />
        <p className="text-sm text-text-muted leading-loose max-w-xs mx-auto">
          零零后作者<br />记录城市、季节与日常的缝隙
        </p>
      </section>

      {/* Theme tags — refined */}
      <section className="mb-16">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans">
          {themes.map((theme, i) => (
            <span key={theme} className="flex items-center gap-6">
              <Link
                href={`/essays?theme=${encodeURIComponent(theme)}`}
                className="text-sm text-text-muted font-bold hover:text-ochre transition-colors tracking-widest"
              >
                {theme}
              </Link>
              {i < themes.length - 1 && (
                <span className="text-warm-line text-xs">/</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-warm-line mb-16" />

      {/* Recent essays */}
      <section>
        <p className="text-[10px] tracking-[0.4em] text-text-muted font-sans font-bold mb-8 text-center">
          最新随笔
        </p>
        <div className="divide-y divide-warm-line">
          {recentEssays.map(essay => (
            <EssayCard key={`${essay.theme}/${essay.slug}`} essay={essay} />
          ))}
        </div>
      </section>

      {/* View all */}
      <div className="text-center mt-12">
        <Link
          href="/essays"
          className="text-xs text-text-muted font-bold hover:text-ochre transition-colors tracking-widest font-sans"
        >
          查看全部作品 →
        </Link>
      </div>
    </div>
  )
}
