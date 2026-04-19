import Link from 'next/link'
import { Search } from 'lucide-react'
import { ALL_LISTING_TYPES, LISTING_TYPE_MAP } from '@/lib/listing-types'
import { getArticles } from '@/lib/wpgraphql'
import { ArticleCard } from '@/components/resources/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deathcare Industry Hub — Directory, News & Resources',
  description:
    'Search funeral homes, cremation services, cemeteries, suppliers, and more. The free, comprehensive deathcare industry directory.',
}

export const revalidate = 3600

const CATEGORY_ICONS: Record<string, string> = {
  'funeral-homes': '⚰️',
  cremation: '🔥',
  cemeteries: '🌿',
  suppliers: '📦',
  technology: '💻',
  'grief-support': '💙',
}

export default async function HomePage() {
  const { articles } = await getArticles()
  const featured = articles.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-sage-400 to-sage-500 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 leading-tight">
            The Deathcare Industry Hub
          </h1>
          <p className="text-sage-100 text-lg mb-10 max-w-xl mx-auto">
            Find funeral homes, cremation services, cemeteries, suppliers, and grief support — all
            in one place.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 w-full max-w-md mx-auto px-5 py-4 rounded-xl bg-white text-slate-500 shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <span>Search the directory...</span>
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ALL_LISTING_TYPES.map(type => (
            <Link
              key={type}
              href={`/directory/${type}`}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-warm-200 shadow-sm hover:shadow-md hover:border-sage-200 transition-all duration-200 text-center group"
            >
              <span className="text-3xl" aria-hidden>
                {CATEGORY_ICONS[type]}
              </span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-sage-600 transition-colors leading-tight">
                {LISTING_TYPE_MAP[type].plural}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      {featured.length > 0 && (
        <section className="bg-warm-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-slate-800">Latest Resources</h2>
              <Link
                href="/resources"
                className="text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-sage-400 rounded-2xl p-10 text-white text-center">
          <h2 className="text-2xl font-serif font-bold mb-3">List Your Business for Free</h2>
          <p className="text-sage-100 mb-6 max-w-md mx-auto">
            Reach thousands of families and professionals searching the deathcare industry.
          </p>
          <Link
            href="/directory"
            className="inline-flex px-6 py-3 rounded-lg bg-white text-sage-600 font-semibold hover:bg-warm-50 transition-colors shadow-sm"
          >
            Get Listed Today
          </Link>
        </div>
      </section>
    </>
  )
}
