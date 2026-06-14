'use client'

import { useState, useEffect } from 'react'
import { initSearchIndex, searchEssays } from '@/lib/search'
import type { EssayMeta } from '@/types'
import EssayCard from './EssayCard'

export default function SearchBox({ essays }: { essays: EssayMeta[] }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<EssayMeta[]>([])

  useEffect(() => {
    initSearchIndex(essays)
  }, [essays])

  function handleChange(value: string) {
    setQuery(value)
    setResults(searchEssays(value))
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => handleChange(e.target.value)}
        placeholder="搜索随笔标题、主题或摘要..."
        className="w-full bg-transparent border-b border-warm-line py-3 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors font-sans text-sm"
      />

      {query && (
        <p className="text-xs text-text-muted mt-3 font-sans">
          {results.length ? `找到 ${results.length} 篇` : '没有匹配结果'}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 divide-y divide-warm-line">
          {results.map(essay => (
            <EssayCard key={`${essay.theme}/${essay.slug}`} essay={essay} />
          ))}
        </div>
      )}
    </div>
  )
}
