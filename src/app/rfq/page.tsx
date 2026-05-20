import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendor RFQ — Source Deathcare Supplies & Services',
  description:
    'Post anonymous RFQs for caskets, urns, embalming supplies, funeral home software, and other deathcare products. Connect with verified suppliers privately.',
}

export const revalidate = 3600

const RFQ_CATEGORIES = [
  {
    value: 'caskets',
    label: 'Caskets & Burial Products',
    icon: '⚰️',
    examples: 'Wood, metal, eco-friendly, veterans',
    badge: 'bg-teal-50 text-teal-700',
  },
  {
    value: 'urns',
    label: 'Urns & Cremation Products',
    icon: '🏺',
    examples: 'Standard, biodegradable, memorial jewelry',
    badge: 'bg-slate-100 text-slate-600',
  },
  {
    value: 'supplies',
    label: 'Embalming & Prep Supplies',
    icon: '🧪',
    examples: 'Fluid, chemicals, restoration products',
    badge: 'bg-amber-50 text-amber-700',
  },
  {
    value: 'software',
    label: 'Funeral Home Software',
    icon: '💻',
    examples: 'FEMS, preneed, accounting, CRM',
    badge: 'bg-purple-50 text-purple-700',
  },
  {
    value: 'vehicles',
    label: 'Vehicles & Equipment',
    icon: '🚗',
    examples: 'Hearses, vans, removal equipment',
    badge: 'bg-sky-50 text-sky-700',
  },
  {
    value: 'monuments',
    label: 'Monuments & Markers',
    icon: '🪨',
    examples: 'Granite, bronze, flush markers',
    badge: 'bg-green-50 text-green-700',
  },
  {
    value: 'floral',
    label: 'Floral & Memorial',
    icon: '🌸',
    examples: 'Wholesale floral, memorial cards, registers',
    badge: 'bg-rose-50 text-rose-700',
  },
  {
    value: 'other',
    label: 'Other Supplies & Services',
    icon: '📦',
    examples: 'Insurance, printing, facilities',
    badge: 'bg-slate-100 text-slate-600',
  },
]

const RECENT_RFQS = [
  {
    id: 'rfq-1',
    category: 'caskets',
    title: 'Wholesale hardwood casket supplier',
    details:
      'Seeking established wholesale supplier for 20-gauge steel and hardwood caskets. Detroit metro area. Volume: 150-200 units/year. Interested in net-30 terms.',
    state: 'MI',
    postedAt: '2026-05-10',
    responses: 3,
    anonymous: true,
  },
  {
    id: 'rfq-2',
    category: 'software',
    title: 'Preneed management software replacement',
    details:
      'Currently on legacy system, looking to migrate. Need: preneed contract management, trust accounting, consumer portals. Budget: $200-400/month. Multi-location (3 sites).',
    state: 'OH',
    postedAt: '2026-05-08',
    responses: 5,
    anonymous: true,
  },
  {
    id: 'rfq-3',
    category: 'vehicles',
    title: 'Second removal van — crew cab preferred',
    details:
      'Adding a second removal van for increased volume. Prefer crew cab configuration, white exterior. Weight-bearing floor required. Will consider new or low-mileage used.',
    state: 'MI',
    postedAt: '2026-05-06',
    responses: 2,
    anonymous: true,
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  caskets: 'Caskets',
  urns: 'Urns',
  supplies: 'Supplies',
  software: 'Software',
  vehicles: 'Vehicles',
  monuments: 'Monuments',
  floral: 'Floral',
  other: 'Other',
}

export default function RFQPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold text-slate-900">Vendor RFQ</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-500">
          Post anonymous requests for proposals to reach verified deathcare suppliers. Suppliers
          respond privately — operators share contact details only if interested.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            step: '1',
            title: 'Post anonymously',
            desc: 'Describe what you need — product specs, volume, location, budget range — without revealing your identity.',
            color: 'bg-teal-50 text-teal-600',
          },
          {
            step: '2',
            title: 'Suppliers respond',
            desc: 'Verified deathcare suppliers see your RFQ and submit proposals through the platform.',
            color: 'bg-purple-50 text-purple-600',
          },
          {
            step: '3',
            title: 'You choose',
            desc: 'Review proposals privately. Share your contact info only with suppliers you want to engage.',
            color: 'bg-amber-50 text-amber-600',
          },
        ].map((s) => (
          <div key={s.step} className="rounded-xl border border-slate-200 bg-white p-5">
            <div
              className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${s.color}`}
            >
              {s.step}
            </div>
            <p className="mb-1 font-semibold text-slate-800">{s.title}</p>
            <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Post RFQ CTA */}
          <div className="mb-8 rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-slate-800">Ready to post an RFQ?</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Verified member account required. Free during founding period.
                </p>
              </div>
              <Link
                href="/join"
                className="shrink-0 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Post an RFQ →
              </Link>
            </div>
          </div>

          {/* Category grid */}
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-xl font-bold text-slate-900">Categories</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {RFQ_CATEGORIES.map((cat) => (
                <div
                  key={cat.value}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-shadow hover:shadow-sm"
                >
                  <p className="mb-1.5 text-2xl">{cat.icon}</p>
                  <p className="mb-0.5 text-xs font-semibold text-slate-800">{cat.label}</p>
                  <p className="text-xs text-slate-400">{cat.examples}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent RFQs */}
          <div>
            <h2 className="mb-4 font-serif text-xl font-bold text-slate-900">Recent requests</h2>
            <div className="space-y-4">
              {RECENT_RFQS.map((rfq) => (
                <div
                  key={rfq.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                      {CATEGORY_LABELS[rfq.category]}
                    </span>
                    <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-400">
                      {rfq.state}
                    </span>
                    {rfq.anonymous && (
                      <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-400">
                        Anonymous operator
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-slate-800">{rfq.title}</h3>
                  <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {rfq.details}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {rfq.responses} supplier{rfq.responses !== 1 ? 's' : ''} responded
                    </span>
                    <Link
                      href="/join"
                      className="font-medium text-teal-600 transition-colors hover:text-teal-700"
                    >
                      Respond as supplier →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 p-5 text-white">
            <p className="mb-1 font-semibold">Are you a supplier?</p>
            <p className="mb-4 text-sm text-teal-100">
              Get a verified supplier listing and access to operator RFQs in your product
              categories. Connect directly with decision-makers.
            </p>
            <Link
              href="/join"
              className="block rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
            >
              List your business →
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Privacy protection</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              {[
                'Your name and business are never shown in RFQs',
                'Only your state and product specs are visible',
                'Suppliers cannot contact you unsolicited',
                'You control when your identity is shared',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 6.5l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 011.06 1.06z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-2 text-sm font-semibold text-slate-700">Browse suppliers</h3>
            <p className="mb-3 text-xs text-slate-500">
              Search the directory for verified vendors in your category.
            </p>
            <Link
              href="/directory/suppliers"
              className="inline-flex w-full justify-center rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Browse supplier directory
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
