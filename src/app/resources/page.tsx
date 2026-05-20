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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold text-slate-800">Resources</h1>
        <p className="text-slate-500">
          Industry news, technology insights, consumer guides, and grief support.
        </p>
      </div>
      <ArticleGrid articles={articles} />
    </div>
  )
}
