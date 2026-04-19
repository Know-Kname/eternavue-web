import { getArticles } from '@/lib/wpgraphql'
import { ArticleGrid } from '@/components/resources/ArticleGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources — Industry News & Consumer Guides',
  description:
    'Deathcare industry news, technology insights, consumer guides, and grief support resources.',
}

export const revalidate = 3600

export default async function ResourcesPage() {
  const { articles } = await getArticles()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2">Resources</h1>
        <p className="text-slate-500">
          Industry news, technology insights, consumer guides, and grief support.
        </p>
      </div>
      <ArticleGrid articles={articles} />
    </div>
  )
}
