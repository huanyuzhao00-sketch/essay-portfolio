import Link from 'next/link'

const links = [
  { href: '/essays', label: '作品' },
  { href: '/about', label: '关于' },
  { href: '/contact', label: '联系' },
  { href: '/search', label: '搜索' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-paper/90 backdrop-blur-sm border-b border-warm-line">
      <nav className="max-w-3xl mx-auto px-5 md:px-12 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.3em] text-ink font-bold transition-colors font-sans">
          夜航船
        </Link>
        <ul className="flex gap-6 md:gap-8">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-xs text-ink font-bold hover:text-ochre transition-colors tracking-wider font-sans">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
