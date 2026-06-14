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
    <div className="flex flex-wrap gap-3 md:gap-5 justify-center font-sans">
      <button
        onClick={() => setFilter(null)}
        className={`text-sm tracking-wider font-bold transition-colors ${
          active ? 'text-text-muted hover:text-ochre' : 'text-ochre'
        }`}
      >
        全部
      </button>
      {themes.map(t => (
        <button
          key={t}
          onClick={() => setFilter(t)}
          className={`text-sm tracking-wider font-bold transition-colors ${
            active === t ? 'text-ochre' : 'text-text-muted hover:text-ochre'
          }`}
        >
          {t}
        </button>
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
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">作品</h1>
        <div className="w-6 h-px bg-ochre mx-auto mb-6" />
        <ThemeFilter themes={themes} active={activeTheme} />
      </div>
      <div ref={ref}>{children}</div>
    </>
  )
}
