import { Suspense } from 'react'
import { getEssaysByTheme, getAllThemes } from '@/lib/essays'
import EssayCard from '@/components/EssayCard'
import EssaysFilter from './EssaysFilter'

export default function EssaysPage() {
  const grouped = getEssaysByTheme()
  const themes = getAllThemes()

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <Suspense fallback={null}>
        <EssaysFilter themes={themes}>
          {themes.map(theme => {
            const essays = grouped.get(theme) || []
            return (
              <section key={theme} data-theme={theme} className="mb-12">
                <h2 className="text-xs tracking-[0.3em] text-text-muted font-sans mb-4 text-center">{theme}</h2>
                <div className="divide-y divide-warm-line">
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
