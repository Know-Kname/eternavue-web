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
  return articles.map(a => ({ slug: a.slug }))
}

export const revalidate = 86400

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const articleData = await getArticle(slug)
  if (!articleData) notFound()
  const article = articleData

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/resources" className="hover:text-sage-600 transition-colors">
          Resources
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium line-clamp-1">{article.title}</span>
      </nav>

      <article className="bg-white rounded-2xl border border-warm-200 shadow-sm overflow-hidden">
        {article.featuredImage && (
          <div className="relative h-64 sm:h-80 w-full">
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
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {article.categories?.map(cat => (
              <Badge key={cat} variant="outline">
                {slugToLabel(cat)}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-serif font-bold text-slate-800 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-slate-400 mb-8 pb-6 border-b border-warm-200">
            {article.author && <span>{article.author}</span>}
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>

          {article.excerpt && (
            <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
              {article.excerpt}
            </p>
          )}

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
            <p className="text-slate-500 italic text-sm">
              Full article content loads when WordPress is connected.
            </p>
          </div>
        </div>
      </article>

      <div className="mt-6">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Resources
        </Link>
      </div>
    </div>
  )
}
