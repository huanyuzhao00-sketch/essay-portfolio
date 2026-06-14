'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ThemeFilter({ themes, active }: { themes: string[]; active: string | null }) {
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
