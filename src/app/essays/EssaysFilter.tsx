'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

function ThemeFilter({ themes, active }: { themes: string[]; active: string | null }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function setFilter(theme: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (theme) {
      params.set('theme', theme)
    } else {
      params.delete('theme')
    }
    router.push(`/essays?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans mb-8">
      <button
        onClick={() => setFilter(null)}
        className={`text-sm tracking-widest font-bold transition-colors ${
          active ? 'text-text-muted hover:text-ochre' : 'text-ochre'
        }`}
      >
        全部
      </button>
      {themes.map((t, i) => (
        <span key={t} className="flex items-center gap-6">
          <span className="text-warm-line text-xs">/</span>
          <button
            onClick={() => setFilter(t)}
            className={`text-sm tracking-widest font-bold transition-colors ${
              active === t ? 'text-ochre' : 'text-text-muted hover:text-ochre'
            }`}
          >
            {t}
          </button>
        </span>
      ))}
    </div>
  )
}

export default function EssaysFilter({ themes, children }: { themes: string[]; children: ReactNode }) {
  const searchParams = useSearchParams()
  const activeTheme = searchParams.get('theme')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const sections = ref.current.querySelectorAll<HTMLElement>('section[data-theme]')
    if (!activeTheme) {
      sections.forEach(el => { el.style.display = '' })
    } else {
      sections.forEach(el => {
        el.style.display = el.dataset.theme === activeTheme ? '' : 'none'
      })
    }
  }, [activeTheme])

  return (
    <>
      <ThemeFilter themes={themes} active={activeTheme} />
      <div ref={ref}>{children}</div>
    </>
  )
}
