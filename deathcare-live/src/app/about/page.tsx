import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About deathcare.live',
  description: 'About deathcare.live — the free, comprehensive deathcare industry hub.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-serif text-4xl font-bold text-slate-800">About deathcare.live</h1>
      <div className="prose prose-slate max-w-none space-y-4 leading-relaxed text-slate-600">
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
