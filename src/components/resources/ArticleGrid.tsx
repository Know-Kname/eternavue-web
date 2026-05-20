import { ArticleCard } from './ArticleCard'
import type { Article } from '@/lib/types'

interface ArticleGridProps {
  articles: Article[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return <p className="py-12 text-center text-slate-500">No articles found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
