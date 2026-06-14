import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { EssayMeta, Essay } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'essays')

export function getAllEssays(): EssayMeta[] {
  const essays: EssayMeta[] = []
  if (!fs.existsSync(CONTENT_DIR)) return essays

  const themes = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())

  for (const theme of themes) {
    const themeDir = path.join(CONTENT_DIR, theme.name)
    const files = fs.readdirSync(themeDir).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const raw = fs.readFileSync(path.join(themeDir, file), 'utf-8')
      const { data } = matter(raw)
      essays.push({
        slug: file.replace(/\.md$/, ''),
        title: data.title || file.replace(/\.md$/, ''),
        date: data.date || '',
        theme: data.theme || theme.name,
        summary: data.summary || '',
      })
    }
  }

  return essays.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

export function getEssaysByTheme(): Map<string, EssayMeta[]> {
  const grouped = new Map<string, EssayMeta[]>()
  for (const essay of getAllEssays()) {
    const list = grouped.get(essay.theme) || []
    list.push(essay)
    grouped.set(essay.theme, list)
  }
  return grouped
}

export function getAllThemes(): string[] {
  return [...getEssaysByTheme().keys()]
}

export async function getEssay(theme: string, slug: string): Promise<Essay | null> {
  const filePath = path.join(CONTENT_DIR, theme, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const result = await remark().use(html).process(content)

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    theme: data.theme || theme,
    summary: data.summary || '',
    contentHtml: result.toString(),
  }
}
