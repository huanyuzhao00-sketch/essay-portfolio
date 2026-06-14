# 短篇随笔作品集网站——实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为短篇随笔作家搭建纯文字中文作品集网站，极简禅意水墨风格，Next.js 静态生成 + Vercel 免费托管。

**Architecture:** Next.js App Router 静态站点，内容通过 `gray-matter` + `remark` 从 `/content/essays/` 目录的 Markdown 文件读取。按主题子目录组织随笔。前端搜索用 Fuse.js。Tailwind CSS 实现禅意水墨配色与排版。

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, gray-matter, remark, Fuse.js, Noto Serif SC (Google Fonts)

---

## 文件结构总览

```
/
├── content/essays/              # 随笔 Markdown 文件（按主题子目录）
│   ├── 城市/                    # 每个主题一个文件夹
│   └── ...
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind + 自定义 CSS
│   │   ├── layout.tsx           # 根布局（NavBar + Footer）
│   │   ├── page.tsx             # 首页
│   │   ├── essays/
│   │   │   └── page.tsx         # 作品列表（按主题分组 + 标签过滤）
│   │   ├── essays/[theme]/[slug]/
│   │   │   └── page.tsx         # 随笔正文页
│   │   ├── about/
│   │   │   └── page.tsx         # 关于我
│   │   ├── contact/
│   │   │   └── page.tsx         # 联系方式
│   │   └── search/
│   │       └── page.tsx         # 搜索页
│   ├── components/
│   │   ├── NavBar.tsx           # 顶部导航
│   │   ├── Footer.tsx           # 页脚
│   │   ├── EssayCard.tsx        # 列表中的随笔卡片
│   │   ├── ThemeFilter.tsx      # 主题标签筛选器
│   │   ├── SearchBox.tsx        # 搜索框 + 结果列表
│   │   └── EssayBody.tsx        # 正文渲染组件（传统书版排版）
│   ├── lib/
│   │   ├── essays.ts            # 读取/解析所有随笔元数据
│   │   └── search.ts            # Fuse.js 搜索索引构建
│   └── types/
│       └── index.ts             # Essay 类型定义
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

### Task 1: 项目脚手架

**Files:**
- Create: `C:/Users/Malak/portfolio-project/package.json`
- Create: `C:/Users/Malak/portfolio-project/tsconfig.json`
- Create: `C:/Users/Malak/portfolio-project/next.config.js`
- Create: `C:/Users/Malak/portfolio-project/tailwind.config.ts`
- Create: `C:/Users/Malak/portfolio-project/postcss.config.js`
- Create: `C:/Users/Malak/portfolio-project/src/app/globals.css`
- Create: `C:/Users/Malak/portfolio-project/src/app/layout.tsx`
- Create: `C:/Users/Malak/portfolio-project/.gitignore`

- [ ] **Step 1: Initialize package.json**

```json
{
  "name": "essay-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "fuse.js": "^7.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd "C:/Users/Malak/portfolio-project" && npm install
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

module.exports = nextConfig
```

- [ ] **Step 5: Create tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#faf9f6',
        ink: '#2d2c28',
        ochre: '#c4a882',
        'ink-light': '#3a3a3a',
        'warm-line': '#e8e3db',
        'text-muted': '#888',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        reading: '680px',
        wide: '720px',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 6: Create postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 7: Create globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

@layer base {
  body {
    @apply bg-paper text-ink font-serif antialiased;
  }
}
```

- [ ] **Step 8: Create root layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '夜航船 · 随笔集',
  description: '陈默的短篇随笔作品集',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 9: Create .gitignore**

```
node_modules/
.next/
out/
```

- [ ] **Step 10: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git init && git add -A && git commit -m "feat: scaffold Next.js project with Tailwind and design tokens"
```

---

### Task 2: 类型定义与随笔数据层

**Files:**
- Create: `C:/Users/Malak/portfolio-project/src/types/index.ts`
- Create: `C:/Users/Malak/portfolio-project/src/lib/essays.ts`

- [ ] **Step 1: Create types**

```ts
// src/types/index.ts
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
```

- [ ] **Step 2: Create essays utility (读取 + 解析)**

```ts
// src/lib/essays.ts
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
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add Essay types and data layer"
```

---

### Task 3: 导航栏与页脚组件

**Files:**
- Create: `C:/Users/Malak/portfolio-project/src/components/NavBar.tsx`
- Create: `C:/Users/Malak/portfolio-project/src/components/Footer.tsx`

- [ ] **Step 1: Create NavBar**

```tsx
// src/components/NavBar.tsx
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
        <Link href="/" className="text-sm tracking-[0.3em] text-text-muted hover:text-ink transition-colors font-sans">
          夜航船
        </Link>
        <ul className="flex gap-6 md:gap-8">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-xs text-text-muted hover:text-ochre transition-colors tracking-wider font-sans">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create Footer**

```tsx
// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-warm-line py-8 text-center">
      <p className="text-xs text-text-muted tracking-wider font-sans">
        © {new Date().getFullYear()} 夜航船
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add NavBar and Footer components"
```

---

### Task 4: 示例随笔内容

**Files:**
- Create: `C:/Users/Malak/portfolio-project/content/essays/城市/深夜的便利店.md`
- Create: `C:/Users/Malak/portfolio-project/content/essays/食事/一碗阳春面.md`
- Create: `C:/Users/Malak/portfolio-project/content/essays/季节/南方的秋.md`

- [ ] **Step 1: Create first sample essay**

```markdown
---
title: 深夜的便利店
date: 2026-03-15
theme: 城市
summary: 凌晨两点的便利店是城市里最温暖的孤岛。
---

凌晨两点，城西的便利店是整条街上唯一亮着灯的地方。

玻璃门滑开，暖风混着关东煮的香气扑面而来。收银台后面，一个戴眼镜的年轻男人抬起头看了我一眼，又低头继续翻手里的漫画。

我拿了一瓶热乌龙茶，走到靠窗的吧台前坐下。窗外偶尔有车无声地滑过，车灯在玻璃上拖出一道模糊的光痕，像墨落在宣纸上缓缓洇开。

便利店的夜班店员大概是这个城市里最沉默的观察者。他们见过凌晨每一个孤独的时刻——加班到崩溃的白领、吵完架无处可去的情侣、刚从火车站拖着箱子出来的异乡人。

我把瓶盖拧紧，推门走出去。街上又只剩下风。

走出一段路回头，那个亮着白光的玻璃盒子还安静地蹲在街角。像一座小小的灯塔。
```

- [ ] **Step 2: Create second sample essay**

```markdown
---
title: 一碗阳春面
date: 2026-02-28
theme: 食事
summary: 最简单的食物里，藏着最深的记忆。
---

外婆做的阳春面，只有三样东西：面、汤、葱花。

面是菜市场买回来的细面，汤是清水煮开了加一点猪油和酱油，葱花是院子里现掐的。没有肉，没有蛋，连青菜都省略了。但她做出来的那碗面，我后来在任何一家面馆都没有吃到过。

诀窍大概是火候。面要煮到刚断生就捞出来，在碗里还会继续熟下去。汤要滚烫地浇上去，把葱花的气味一下子激出来。猪油在热汤里化开，浮成一层细细密密的油花。

外婆走了以后，我自己试过很多次。面、汤、葱花，一样的步骤，不一样的味道。

后来我明白了。那碗面真正的配料，是冬天厨房里的雾气，是她站在灶台前微微驼着的背影，是我放学回家推开门的那个时刻。

有些食物，不是因为好吃才被记住的。
```

- [ ] **Step 3: Create third sample essay**

```markdown
---
title: 南方的秋
date: 2026-02-10
theme: 季节
summary: 南方的秋天不是突然到来的，是渗透进来的。
---

北方的朋友问，南方的秋天是什么样子的。

我想了很久。南方的秋天不是突然到来的。没有一场雨之后就天高云淡，没有一夜之间树叶全黄。它是渗透进来的。

先是光变得薄了。夏天的阳光是稠的、白的，晒在手臂上有重量。秋天的光是稀的、金黄的，像用筛子滤过一遍。

然后是风。南方的秋风不凛冽，它只是终于不热了。走在街上，皮肤还能感觉到一点太阳的温度，但风吹过来是凉的。这种温差很小，小到不注意就会忽略。

树还是绿的。桂花开了，满城都是甜的。你要很仔细地闻，才能从空气里捕捉到一股若有若无的焦糖味——那是有人在巷子里烤红薯。

南方的秋不是季节，是一种感觉。是你终于在漫长的夏天之后松一口气。
```

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add sample essays"
```

---

### Task 5: 首页

**Files:**
- Create: `C:/Users/Malak/portfolio-project/src/app/page.tsx`
- Create: `C:/Users/Malak/portfolio-project/src/components/EssayCard.tsx`

- [ ] **Step 1: Create EssayCard component**

```tsx
// src/components/EssayCard.tsx
import Link from 'next/link'
import type { EssayMeta } from '@/types'

export default function EssayCard({ essay }: { essay: EssayMeta }) {
  return (
    <Link
      href={`/essays/${encodeURIComponent(essay.theme)}/${encodeURIComponent(essay.slug)}`}
      className="block group py-3"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-base text-ink group-hover:text-ochre transition-colors">
          {essay.title}
        </h3>
        <span className="text-xs text-text-muted font-sans shrink-0">
          {essay.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2.$3')}
        </span>
      </div>
      {essay.summary && (
        <p className="text-sm text-text-muted mt-1 leading-relaxed">{essay.summary}</p>
      )}
    </Link>
  )
}
```

- [ ] **Step 2: Create homepage**

```tsx
// src/app/page.tsx
import Link from 'next/link'
import { getAllEssays, getAllThemes } from '@/lib/essays'
import EssayCard from '@/components/EssayCard'

export default function HomePage() {
  const themes = getAllThemes()
  const recentEssays = getAllEssays().slice(0, 5)

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      {/* Hero */}
      <section className="text-center mb-16">
        <p className="text-[10px] tracking-[0.4em] text-text-muted font-sans mb-8">陈默的随笔集</p>
        <h1 className="text-3xl md:text-4xl text-ink tracking-[0.15em] mb-6">夜航船</h1>
        <div className="w-8 h-px bg-ochre mx-auto mb-6" />
        <p className="text-sm text-text-muted leading-loose">
          九零后写作者<br />记录城市、季节与日常的缝隙
        </p>
      </section>

      {/* Theme tags */}
      <section className="mb-12">
        <div className="w-full h-px bg-warm-line mb-6" />
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {themes.map(theme => (
            <Link
              key={theme}
              href={`/essays?theme=${encodeURIComponent(theme)}`}
              className="text-sm text-text-muted hover:text-ochre transition-colors font-sans tracking-wider"
            >
              {theme}
            </Link>
          ))}
        </div>
        <div className="w-full h-px bg-warm-line mt-6" />
      </section>

      {/* Recent essays */}
      <section>
        <p className="text-[10px] tracking-[0.3em] text-text-muted font-sans mb-6 text-center">最新随笔</p>
        <div className="divide-y divide-warm-line">
          {recentEssays.map(essay => (
            <EssayCard key={`${essay.theme}/${essay.slug}`} essay={essay} />
          ))}
        </div>
      </section>

      {/* Link to all essays */}
      <div className="text-center mt-10">
        <Link href="/essays" className="text-xs text-text-muted hover:text-ochre transition-colors tracking-wider font-sans">
          查看全部作品 →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add homepage with hero, themes, and recent essays"
```

---

### Task 6: 作品列表页

**Files:**
- Create: `C:/Users/Malak/portfolio-project/src/app/essays/page.tsx`
- Create: `C:/Users/Malak/portfolio-project/src/components/ThemeFilter.tsx`

- [ ] **Step 1: Create ThemeFilter (client component)**

```tsx
// src/components/ThemeFilter.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ThemeFilter({ themes, active }: { themes: string[]; active: string | null }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function setFilter(theme: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (theme) {
      params.set('theme', theme)
    } else {
      params.delete('theme')
    }
    router.push(`/essays?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 md:gap-5 justify-center font-sans">
      <button
        onClick={() => setFilter(null)}
        className={`text-sm tracking-wider transition-colors ${
          active ? 'text-text-muted hover:text-ochre' : 'text-ochre'
        }`}
      >
        全部
      </button>
      {themes.map(t => (
        <button
          key={t}
          onClick={() => setFilter(t)}
          className={`text-sm tracking-wider transition-colors ${
            active === t ? 'text-ochre' : 'text-text-muted hover:text-ochre'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create essays page**

```tsx
// src/app/essays/page.tsx
import { getEssaysByTheme, getAllThemes } from '@/lib/essays'
import ThemeFilter from '@/components/ThemeFilter'
import EssayCard from '@/components/EssayCard'

export default function EssaysPage({ searchParams }: { searchParams: { theme?: string } }) {
  const grouped = getEssaysByTheme()
  const themes = getAllThemes()
  const activeTheme = searchParams.theme || null

  const displayThemes = activeTheme
    ? themes.filter(t => t === activeTheme)
    : themes

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">作品</h1>
        <div className="w-6 h-px bg-ochre mx-auto mb-6" />
        <ThemeFilter themes={themes} active={activeTheme} />
      </div>

      {displayThemes.map(theme => {
        const essays = grouped.get(theme) || []
        return (
          <section key={theme} className="mb-12">
            <h2 className="text-xs tracking-[0.3em] text-text-muted font-sans mb-4 text-center">{theme}</h2>
            <div className="divide-y divide-warm-line">
              {essays.map(essay => (
                <EssayCard key={`${essay.theme}/${essay.slug}`} essay={essay} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add essays list page with theme filtering"
```

---

### Task 7: 关于我页面 & 联系方式页面

**Files:**
- Create: `C:/Users/Malak/portfolio-project/src/app/about/page.tsx`
- Create: `C:/Users/Malak/portfolio-project/src/app/contact/page.tsx`

- [ ] **Step 1: Create About page**

```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">关于我</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>

      <article className="prose-custom">
        <p className="text-base text-ink-light leading-[2.2] text-indent mb-6">
          陈默，九零后。生于南方，现居上海。
        </p>
        <p className="text-base text-ink-light leading-[2.2] text-indent mb-6">
          白天在一家互联网公司做产品，晚上和周末写字。写城市里的日常，写吃过的食物，写遇到过的人，写那些不说出来就会忘记的瞬间。
        </p>
        <p className="text-base text-ink-light leading-[2.2] text-indent">
          相信文字可以慢下来。在这个什么都很快的时代，慢慢地写完一段话，是少数几个还属于自己的时刻。
        </p>
      </article>
    </div>
  )
}
```

- [ ] **Step 2: Create Contact page**

```tsx
// src/app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">联系</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>

      <div className="space-y-6 text-center">
        <div>
          <p className="text-xs tracking-[0.2em] text-text-muted font-sans mb-2">邮箱</p>
          <a href="mailto:your-email@example.com" className="text-base text-ink hover:text-ochre transition-colors">
            your-email@example.com
          </a>
        </div>
        <div className="w-12 h-px bg-warm-line mx-auto" />
        <div>
          <p className="text-xs tracking-[0.2em] text-text-muted font-sans mb-3">社交</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-sm text-text-muted hover:text-ochre transition-colors font-sans">豆瓣</a>
            <a href="#" className="text-sm text-text-muted hover:text-ochre transition-colors font-sans">即刻</a>
            <a href="#" className="text-sm text-text-muted hover:text-ochre transition-colors font-sans">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add About and Contact pages"
```

---

### Task 8: 随笔正文页（核心阅读体验）

**Files:**
- Create: `C:/Users/Malak/portfolio-project/src/app/essays/[theme]/[slug]/page.tsx`
- Create: `C:/Users/Malak/portfolio-project/src/components/EssayBody.tsx`

- [ ] **Step 1: Create EssayBody component**

```tsx
// src/components/EssayBody.tsx
export default function EssayBody({ html }: { html: string }) {
  return (
    <div
      className="
        text-base text-ink-light leading-[2.2] max-w-reading mx-auto
        [&>p]:text-indent
        [&>p]:mb-0
        [&>p+p]:mt-0
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

- [ ] **Step 2: Create essay detail page**

```tsx
// src/app/essays/[theme]/[slug]/page.tsx
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

  return (
    <div className="max-w-reading mx-auto px-5 md:px-12 py-16 md:py-24">
      {/* Meta */}
      <div className="text-center mb-8">
        <div className="text-[10px] tracking-[0.2em] text-text-muted font-sans">
          <Link href={`/essays?theme=${encodeURIComponent(essay.theme)}`} className="hover:text-ochre transition-colors">
            {essay.theme}
          </Link>
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
                className="text-text-muted hover:text-ochre transition-colors"
              >
                ← {prev.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                href={`/essays/${encodeURIComponent(next.theme)}/${encodeURIComponent(next.slug)}`}
                className="text-text-muted hover:text-ochre transition-colors"
              >
                {next.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add essay detail page with traditional Chinese typography"
```

---

### Task 9: 搜索页面

**Files:**
- Create: `C:/Users/Malak/portfolio-project/src/lib/search.ts`
- Create: `C:/Users/Malak/portfolio-project/src/app/search/page.tsx`
- Create: `C:/Users/Malak/portfolio-project/src/components/SearchBox.tsx`

- [ ] **Step 1: Create search index builder**

```ts
// src/lib/search.ts
import Fuse from 'fuse.js'
import { getAllEssays } from './essays'
import type { EssayMeta } from '@/types'

let fuseInstance: Fuse<EssayMeta> | null = null

function getFuse(): Fuse<EssayMeta> {
  if (!fuseInstance) {
    const essays = getAllEssays()
    fuseInstance = new Fuse(essays, {
      keys: ['title', 'summary', 'theme'],
      threshold: 0.3,
      includeScore: true,
    })
  }
  return fuseInstance
}

export function searchEssays(query: string): EssayMeta[] {
  if (!query.trim()) return []
  return getFuse().search(query.trim()).map(r => r.item)
}
```

- [ ] **Step 2: Create SearchBox (client component)**

```tsx
// src/components/SearchBox.tsx
'use client'

import { useState } from 'react'
import { searchEssays } from '@/lib/search'
import type { EssayMeta } from '@/types'
import EssayCard from './EssayCard'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<EssayMeta[]>([])

  function handleChange(value: string) {
    setQuery(value)
    setResults(searchEssays(value))
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => handleChange(e.target.value)}
        placeholder="搜索随笔标题、主题或摘要..."
        className="w-full bg-transparent border-b border-warm-line py-3 text-base text-ink placeholder:text-text-muted focus:outline-none focus:border-ochre transition-colors font-sans text-sm"
      />

      {query && (
        <p className="text-xs text-text-muted mt-3 font-sans">
          {results.length ? `找到 ${results.length} 篇` : '没有匹配结果'}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 divide-y divide-warm-line">
          {results.map(essay => (
            <EssayCard key={`${essay.theme}/${essay.slug}`} essay={essay} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create search page**

```tsx
// src/app/search/page.tsx
import SearchBox from '@/components/SearchBox'

export default function SearchPage() {
  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-10">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">搜索</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>
      <SearchBox />
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "feat: add search page with Fuse.js"
```

---

### Task 10: 视觉润色与响应式适配

**Files:**
- Modify: `C:/Users/Malak/portfolio-project/src/app/globals.css`
- Modify: `C:/Users/Malak/portfolio-project/src/app/layout.tsx`

- [ ] **Step 1: Add custom utility classes to globals.css**

```css
/* 追加到 globals.css 末尾 */

@layer utilities {
  .text-indent {
    text-indent: 2em;
  }
}

/* 选中文字颜色 */
::selection {
  background-color: #c4a882;
  color: #faf9f6;
}

/* 移动端字号提升 */
@media (max-width: 640px) {
  body {
    font-size: 15px;
  }
}
```

- [ ] **Step 2: Update layout metadata with proper SEO**

```tsx
// 替换 layout.tsx 中的 metadata
export const metadata: Metadata = {
  title: {
    default: '夜航船 · 随笔集',
    template: '%s · 夜航船',
  },
  description: '陈默的短篇随笔作品集——记录城市、季节与日常的缝隙',
  openGraph: {
    title: '夜航船 · 随笔集',
    description: '陈默的短篇随笔作品集',
    type: 'website',
    locale: 'zh_CN',
  },
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "style: add typography polish, selection color, and SEO metadata"
```

---

### Task 11: 构建验证

- [ ] **Step 1: Run dev server to test**

```bash
cd "C:/Users/Malak/portfolio-project" && npm run dev
```

Open http://localhost:3000 and verify:
- Homepage loads with hero, theme links, recent essays
- /essays shows grouped essays with theme filter
- Clicking an essay shows proper traditional book typography (text-indent, line height)
- /about and /contact pages render
- /search returns results for matching queries

- [ ] **Step 2: Run static export build**

```bash
cd "C:/Users/Malak/portfolio-project" && npm run build
```

Expected: Build succeeds without errors, generates static HTML in `out/` directory.

- [ ] **Step 3: Check output**

```bash
ls "C:/Users/Malak/portfolio-project/out/"
```

Expected: `index.html`, `essays.html`, `about.html`, `contact.html`, `search.html`, plus individual essay pages under `essays/[theme]/[slug]/`.

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/Malak/portfolio-project" && git add -A && git commit -m "chore: verify build succeeds"
```

---

### Task 12: GitHub 仓库创建与 Vercel 部署

- [ ] **Step 1: Create GitHub repository**

在 GitHub 上创建新仓库（如 `essay-portfolio`），不要勾选 "Initialize with README"。

- [ ] **Step 2: Push to GitHub**

```bash
cd "C:/Users/Malak/portfolio-project"
git remote add origin https://github.com/YOUR_USERNAME/essay-portfolio.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy to Vercel**

1. 访问 https://vercel.com/new
2. 导入刚创建的 GitHub 仓库
3. 构建设置保持默认（Vercel 自动识别 Next.js）
4. 点击 Deploy

部署完成后 Vercel 会提供一个 `*.vercel.app` 域名。

- [ ] **Step 4: 验证线上部署**

打开 Vercel 提供的域名，逐页检查所有页面加载正常。

---

## 后续用户自行完成

站点上线后，以下内容由作者自行配置：

1. **替换站点名称和笔名**：修改 `layout.tsx` metadata 和首页 `h1`
2. **更新关于我内容**：编辑 `about/page.tsx` 中的自我介绍
3. **填写真实联系方式**：编辑 `contact/page.tsx` 中的邮箱和社交链接
4. **添加更多随笔**：在 `content/essays/[主题]/` 下新建 `.md` 文件，`git push` 后自动部署
5. **自定义域名**：在 Vercel 项目设置中添加自己的域名

---

*实现计划由 writing-plans 产出，每个 Task 可独立执行和提交。*
