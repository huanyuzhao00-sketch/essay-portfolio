import { getAllEssays } from '@/lib/essays'
import SearchBox from '@/components/SearchBox'

export default function SearchPage() {
  const essays = getAllEssays()

  return (
    <div className="max-w-xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-center mb-10">
        <h1 className="text-2xl text-ink tracking-[0.15em] mb-4">搜索</h1>
        <div className="w-6 h-px bg-ochre mx-auto" />
      </div>
      <SearchBox essays={essays} />
    </div>
  )
}
