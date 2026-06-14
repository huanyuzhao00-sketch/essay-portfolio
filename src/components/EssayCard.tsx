import Link from 'next/link'
import type { EssayMeta } from '@/types'

export default function EssayCard({ essay }: { essay: EssayMeta }) {
  return (
    <Link
      href={`/essays/${encodeURIComponent(essay.theme)}/${encodeURIComponent(essay.slug)}`}
      className="block group py-3"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-base text-ink group-hover:text-ochre transition-colors">
          {essay.title}
        </h3>
        <span className="text-xs text-text-muted font-sans shrink-0">
          {essay.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2.$3')}
        </span>
      </div>
      {essay.summary && (
        <p className="text-sm text-text-muted mt-1 leading-relaxed">{essay.summary}</p>
      )}
    </Link>
  )
}
