import Link from 'next/link'

const links = [
  { href: '/essays', label: '作品' },
  { href: '/about', label: '关于' },
  { href: '/contact', label: '联系' },
  { href: '/search', label: '搜索' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-paper/95 backdrop-blur-sm">
      <div className="max-w-xl mx-auto px-5 md:px-12">
        <nav className="h-16 flex items-center justify-between border-b border-warm-line">
          <Link
            href="/"
            className="text-base text-ochre tracking-[0.2em] hover:text-ink transition-colors"
          >
            夜航船
          </Link>
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
    </header>
  )
}
