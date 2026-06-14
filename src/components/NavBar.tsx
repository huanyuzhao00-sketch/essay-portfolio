import Link from 'next/link'

const links = [
  { href: '/essays', label: '作品' },
  { href: '/about', label: '关于' },
  { href: '/contact', label: '联系' },
  { href: '/search', label: '搜索' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-paper/95 backdrop-blur-sm border-b border-warm-line">
      {/* Top row: nav links aligned right */}
      <div className="max-w-xl mx-auto px-5 md:px-12">
        <nav className="flex justify-end py-3">
          <ul className="flex gap-5 md:gap-7">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-text-muted hover:text-ochre transition-colors tracking-widest font-sans font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Bottom row: brand name centered */}
      <div className="text-center pb-4">
        <Link
          href="/"
          className="text-lg text-ochre tracking-[0.25em] hover:text-ink transition-colors"
        >
          夜航船
        </Link>
      </div>
    </header>
  )
}
