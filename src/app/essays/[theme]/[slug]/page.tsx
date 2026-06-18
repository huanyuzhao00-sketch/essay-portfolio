import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEssay, getAllEssays } from '@/lib/essays'
import EssayBody from '@/components/EssayBody'

export async function generateStaticParams() {
  return getAllEssays().map(e => ({
    theme: e.theme,
    slug: e.slug,
  }))
}

export default async function EssayPage({ params }: { params: { theme: string; slug: string } }) {
  const essay = await getEssay(decodeURIComponent(params.theme), decodeURIComponent(params.slug))
  if (!essay) notFound()

  const allEssays = getAllEssays()
  const currentIndex = allEssays.findIndex(e => e.theme === essay.theme && e.slug === essay.slug)
  const prev = currentIndex > 0 ? allEssays[currentIndex - 1] : null
  const next = currentIndex < allEssays.length - 1 ? allEssays[currentIndex + 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    description: essay.summary,
    datePublished: essay.date,
    author: {
      '@type': 'Person',
      name: essay.author || 'Doremi',
    },
    publisher: {
      '@type': 'Organization',
      name: '夜航船',
      url: 'https://www.doremi.xin',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      {/* Meta */}
      <div className="text-center mb-8">
        <div className="text-[10px] tracking-[0.2em] text-text-muted font-sans font-bold">
          <Link href={`/essays?theme=${encodeURIComponent(essay.theme)}`} className="hover:text-ochre transition-colors">
            {essay.theme}
          </Link>
          {essay.author && (
            <>
              <span className="mx-2">·</span>
              <span className="text-ochre">{essay.author}</span>
            </>
          )}
          <span className="mx-2">·</span>
          <span>{essay.date}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl text-ink text-center tracking-[0.1em] mb-6">
        {essay.title}
      </h1>
      <div className="w-6 h-px bg-ochre mx-auto mb-12" />

      {/* Body */}
      <EssayBody html={essay.contentHtml} />

      {/* Prev/Next navigation */}
      <div className="mt-16 pt-8 border-t border-warm-line">
        <div className="flex justify-between text-sm">
          <div>
            {prev && (
              <Link
                href={`/essays/${encodeURIComponent(prev.theme)}/${encodeURIComponent(prev.slug)}`}
                className="text-text-muted font-bold hover:text-ochre transition-colors"
              >
                &larr; {prev.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                href={`/essays/${encodeURIComponent(next.theme)}/${encodeURIComponent(next.slug)}`}
                className="text-text-muted font-bold hover:text-ochre transition-colors"
              >
                {next.title} &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
