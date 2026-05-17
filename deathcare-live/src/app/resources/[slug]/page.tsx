import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getArticle, getArticles } from '@/lib/wpgraphql'
import { Badge } from '@/components/ui/Badge'
import { formatDate, slugToLabel } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  const { articles } = await getArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export const revalidate = 86400

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const articleData = await getArticle(slug)
  if (!articleData) notFound()
  const article = articleData

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/resources" className="hover:text-sage-600 transition-colors">
          Resources
        </Link>
        <span>/</span>
        <span className="line-clamp-1 font-medium text-slate-800">{article.title}</span>
      </nav>

      <article className="border-warm-200 overflow-hidden rounded-2xl border bg-white shadow-sm">
        {article.featuredImage && (
          <div className="relative h-64 w-full sm:h-80">
            <Image
              src={article.featuredImage.sourceUrl}
              alt={article.featuredImage.altText || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div className="p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {article.categories?.map((cat) => (
              <Badge key={cat} variant="outline">
                {slugToLabel(cat)}
              </Badge>
            ))}
          </div>

          <h1 className="mb-4 font-serif text-3xl leading-tight font-bold text-slate-800">
            {article.title}
          </h1>

          <div className="border-warm-200 mb-8 flex items-center gap-3 border-b pb-6 text-sm text-slate-400">
            {article.author && <span>{article.author}</span>}
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>

          {article.excerpt && (
            <p className="mb-6 text-lg leading-relaxed font-medium text-slate-600">
              {article.excerpt}
            </p>
          )}

          <div className="prose prose-slate max-w-none leading-relaxed text-slate-700">
            <p className="text-sm text-slate-500 italic">
              Full article content loads when WordPress is connected.
            </p>
          </div>
        </div>
      </article>

      <div className="mt-6">
        <Link
          href="/resources"
          className="text-sage-600 hover:text-sage-700 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Resources
        </Link>
      </div>
    </div>
  )
}
