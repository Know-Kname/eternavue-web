import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { formatDate, slugToLabel } from '@/lib/utils'
import type { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/resources/${article.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-warm-200 shadow-sm overflow-hidden h-full flex flex-col transition-shadow duration-200 group-hover:shadow-md group-hover:border-sage-200">
        {article.featuredImage ? (
          <div className="relative h-44 w-full overflow-hidden bg-warm-100">
            <Image
              src={article.featuredImage.sourceUrl}
              alt={article.featuredImage.altText || article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="h-44 bg-gradient-to-br from-sage-50 to-warm-100 flex items-center justify-center">
            <span className="text-4xl opacity-30">📰</span>
          </div>
        )}

        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {article.categories?.slice(0, 2).map(cat => (
              <Badge key={cat} variant="outline">
                {slugToLabel(cat)}
              </Badge>
            ))}
          </div>

          <h3 className="font-semibold text-slate-800 text-base leading-snug line-clamp-2 group-hover:text-sage-600 transition-colors flex-1">
            {article.title}
          </h3>

          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{article.excerpt}</p>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-warm-200">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.author && <span>{article.author}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
