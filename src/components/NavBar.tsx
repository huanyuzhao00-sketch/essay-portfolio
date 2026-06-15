import Link from 'next/link'

const links = [
  { href: '/essays', label: '作品' },
  { href: '/about', label: '关于' },
  { href: '/submit', label: '投稿' },
  { href: '/search', label: '搜索' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-paper/95 backdrop-blur-sm border-b border-warm-line">
      <nav className="max-w-xl mx-auto px-5 md:px-12 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-ochre tracking-[0.25em] hover:text-ink transition-colors"
        >
          夜航船
        </Link>
        <ul className="flex gap-5 md:gap-7">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-ink font-bold hover:text-ochre transition-colors tracking-wider font-sans"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
