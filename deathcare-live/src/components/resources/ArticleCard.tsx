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
    <Link href={`/resources/${article.slug}`} className="group block">
      <article className="border-warm-200 group-hover:border-sage-200 flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow duration-200 group-hover:shadow-md">
        {article.featuredImage ? (
          <div className="bg-warm-100 relative h-44 w-full overflow-hidden">
            <Image
              src={article.featuredImage.sourceUrl}
              alt={article.featuredImage.altText || article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="from-sage-50 to-warm-100 flex h-44 items-center justify-center bg-gradient-to-br">
            <span className="text-4xl opacity-30">📰</span>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {article.categories?.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="outline">
                {slugToLabel(cat)}
              </Badge>
            ))}
          </div>

          <h3 className="group-hover:text-sage-600 line-clamp-2 flex-1 text-base leading-snug font-semibold text-slate-800 transition-colors">
            {article.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">{article.excerpt}</p>

          <div className="border-warm-200 flex items-center justify-between border-t pt-1 text-xs text-slate-400">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.author && <span>{article.author}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
