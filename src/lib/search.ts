import Fuse from 'fuse.js'
import type { EssayMeta } from '@/types'

let fuseInstance: Fuse<EssayMeta> | null = null
let cachedEssays: EssayMeta[] = []

export function initSearchIndex(essays: EssayMeta[]) {
  fuseInstance = new Fuse(essays, {
    keys: ['title', 'summary', 'theme', 'author'],
    threshold: 0.3,
    includeScore: true,
  })
  cachedEssays = essays
}

export function searchEssays(query: string): EssayMeta[] {
  if (!query.trim() || !fuseInstance) return []
  return fuseInstance.search(query.trim()).map(r => r.item)
}

export function getAllCachedEssays(): EssayMeta[] {
  return cachedEssays
}
