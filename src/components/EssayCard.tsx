import Link from 'next/link'
import type { EssayMeta } from '@/types'

export default function EssayCard({ essay }: { essay: EssayMeta }) {
  return (
    <Link
      href={`/essays/${encodeURIComponent(essay.theme)}/${encodeURIComponent(essay.slug)}`}
      className="block group py-4"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base text-ink group-hover:text-ochre transition-colors leading-snug">
            {essay.title}
          </h3>
          {essay.summary && (
            <p className="text-xs text-text-muted mt-1.5 leading-relaxed line-clamp-1">
              {essay.summary}
            </p>
          )}
        </div>
        <span className="text-xs text-text-muted font-sans font-bold shrink-0 mt-0.5">
          {essay.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2.$3')}
        </span>
      </div>
    </Link>
  )
}
