import { Suspense } from 'react'
import { getEssaysByTheme, getAllThemes } from '@/lib/essays'
import EssayCard from '@/components/EssayCard'
import EssaysFilter from './EssaysFilter'

export default function EssaysPage() {
  const grouped = getEssaysByTheme()
  const themes = getAllThemes()

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">作品</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>

      <Suspense fallback={null}>
        <EssaysFilter themes={themes}>
          {themes.map((theme, idx) => {
            const essays = grouped.get(theme) || []
            return (
              <section key={theme} data-theme={theme}>
                <div className="text-center mb-6">
                  <h2 className="text-xs tracking-[0.4em] text-text-muted font-sans font-bold">{theme}</h2>
                </div>
                <div className="divide-y divide-warm-line mb-12">
                  {essays.map(essay => (
                    <EssayCard key={`${essay.theme}/${essay.slug}`} essay={essay} />
                  ))}
                </div>
              </section>
            )
          })}
        </EssaysFilter>
      </Suspense>
    </div>
  )
}
