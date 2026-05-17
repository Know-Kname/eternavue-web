import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_BILLS, MOCK_POSTS, MOCK_COALITIONS, STATE_NAMES } from '@/lib/mock-community'
import { STATUS_BADGE } from '@/lib/bill-utils'
import { formatDate } from '@/lib/utils'
import { BillStatusBar } from '@/components/legislative/BillStatusBar'
import { CoalitionPanel } from '@/components/legislative/CoalitionPanel'
import { PostCard } from '@/components/community/PostCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string; billId: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { billId } = await params
  const bill = MOCK_BILLS.find((b) => b.id === billId)
  if (!bill) return {}
  return {
    title: `${bill.billNumber} — ${bill.title}`,
    description: bill.description,
  }
}

export async function generateStaticParams() {
  return MOCK_BILLS.map((b) => ({ state: b.state, billId: b.id }))
}

export const revalidate = 3600

export default async function BillPage({ params }: PageProps) {
  const { state, billId } = await params
  const stateCode = state.toUpperCase()
  const stateName = STATE_NAMES[stateCode]
  const bill = MOCK_BILLS.find((b) => b.id === billId && b.state === stateCode)
  if (!bill || !stateName) notFound()

  const discussions = MOCK_POSTS.filter((p) => p.billId === bill.id)
  const coalitions = MOCK_COALITIONS.filter((c) => c.billId === bill.id)
  const badge = STATUS_BADGE[bill.status]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <Link href="/states" className="transition-colors hover:text-teal-600">
          States
        </Link>
        <span>/</span>
        <Link href={`/states/${stateCode}`} className="transition-colors hover:text-teal-600">
          {stateName}
        </Link>
        <span>/</span>
        <Link href={`/bills/${stateCode}`} className="transition-colors hover:text-teal-600">
          Bills
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{bill.billNumber}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex flex-wrap items-start gap-3">
              <span className="text-gold-600 bg-gold-50 rounded-full px-3 py-1 text-sm font-bold">
                {bill.billNumber}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
                {bill.state}
              </span>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${badge.className}`}>
                {badge.label}
              </span>
              {bill.industryTags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-50 px-2 py-1 text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-3 font-serif text-2xl leading-snug font-bold text-slate-900">
              {bill.title}
            </h1>

            <p className="mb-6 leading-relaxed text-slate-600">{bill.description}</p>

            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Legislative status
              </p>
              <BillStatusBar status={bill.status} />
            </div>

            <p className="text-sm text-slate-400">
              Last action: <span className="text-slate-600">{bill.lastAction}</span>
              {' · '}
              <span>{formatDate(bill.lastActionDate)}</span>
            </p>
          </div>

          {bill.sponsors.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">
                Sponsors
              </h2>
              <div className="space-y-2">
                {bill.sponsors.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-800">{s.name}</span>
                    {s.party && (
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                          s.party === 'D' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {s.party}
                      </span>
                    )}
                    {s.district && <span className="text-slate-400">{s.district}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {bill.history.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">
                Legislative history
              </h2>
              <ol className="space-y-3">
                {[...bill.history].reverse().map((h, i) => (
                  <li key={i} className="flex gap-4 text-sm">
                    <span className="w-28 shrink-0 text-slate-400">{formatDate(h.date)}</span>
                    <div>
                      <span className="text-slate-700">{h.action}</span>
                      {h.chamber && (
                        <span className="ml-2 text-xs text-slate-400">({h.chamber})</span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {discussions.length > 0 && (
            <section>
              <h2 className="mb-4 font-serif text-xl font-bold text-slate-900">
                Industry discussions ({discussions.length})
              </h2>
              <div className="space-y-4">
                {discussions.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl bg-teal-500 p-5 text-white">
            <h3 className="mb-2 font-semibold">Take action</h3>
            <p className="mb-4 text-sm text-teal-100">
              Follow this bill, join a coalition, or contact your representative.
            </p>
            <div className="space-y-2">
              <Link
                href="/join"
                className="flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
              >
                Follow this bill
              </Link>
              <a
                href={bill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full justify-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                View on legislature.gov ↗
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Bill stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: bill.followCount ?? 0, label: 'Following', color: 'text-teal-600' },
                {
                  value: bill.discussionCount ?? 0,
                  label: 'Discussions',
                  color: 'text-purple-600',
                },
                { value: coalitions.length, label: 'Coalitions', color: 'text-gold-600' },
                { value: bill.sponsors.length, label: 'Sponsors', color: 'text-slate-600' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {coalitions.length > 0 && <CoalitionPanel coalitions={coalitions} />}
        </aside>
      </div>
    </div>
  )
}
