import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About deathcare.live',
  description: 'About deathcare.live — the free, comprehensive deathcare industry hub.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-serif font-bold text-slate-800 mb-6">About deathcare.live</h1>
      <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
        <p>
          deathcare.live is the free, open industry hub for deathcare professionals and the families
          they serve. Our mission is to make it easy to find trusted funeral homes, cremation
          services, cemeteries, suppliers, technology vendors, and grief support resources.
        </p>
        <p>
          Unlike member-gated association directories, deathcare.live is publicly searchable and
          free for consumers — and free for businesses to list.
        </p>
        <p>
          We also publish industry news, technology insights, consumer guides, and grief support
          resources to help both professionals and families navigate the deathcare landscape.
        </p>
      </div>
    </div>
  )
}
