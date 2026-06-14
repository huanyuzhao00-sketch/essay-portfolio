export interface EssayMeta {
  slug: string
  title: string
  date: string
  theme: string
  summary: string
}

export interface Essay extends EssayMeta {
  contentHtml: string
}
