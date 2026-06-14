const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://doremi.xin'
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'essays')

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/essays', priority: '0.9', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
  { url: '/search', priority: '0.4', changefreq: 'monthly' },
]

// Scan essays
if (fs.existsSync(CONTENT_DIR)) {
  const themes = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
  for (const theme of themes) {
    const files = fs.readdirSync(path.join(CONTENT_DIR, theme.name))
      .filter(f => f.endsWith('.md'))
    for (const file of files) {
      const slug = file.replace(/\.md$/, '')
      pages.push({
        url: `/essays/${encodeURIComponent(theme.name)}/${encodeURIComponent(slug)}`,
        priority: '0.8',
        changefreq: 'monthly',
      })
    }
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <priority>${p.priority}</priority>
    <changefreq>${p.changefreq}</changefreq>
  </url>`).join('\n')}
</urlset>
`

fs.writeFileSync(path.join(__dirname, '..', 'out', 'sitemap.xml'), xml)
console.log(`Sitemap generated with ${pages.length} URLs`)
