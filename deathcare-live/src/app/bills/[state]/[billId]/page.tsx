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
  const bill = MOCK_BILLS.find(b => b.id === billId)
  if (!bill) return {}
  return {
    title: `${bill.billNumber} — ${bill.title}`,
    description: bill.description,
  }
}

export async function generateStaticParams() {
  return MOCK_BILLS.map(b => ({ state: b.state, billId: b.id }))
}

export const revalidate = 3600

export default async function BillPage({ params }: PageProps) {
  const { state, billId } = await params
  const stateCode = state.toUpperCase()
  const stateName = STATE_NAMES[stateCode]
  const bill = MOCK_BILLS.find(b => b.id === billId && b.state === stateCode)
  if (!bill || !stateName) notFound()

  const discussions = MOCK_POSTS.filter(p => p.billId === bill.id)
  const coalitions = MOCK_COALITIONS.filter(c => c.billId === bill.id)
  const badge = STATUS_BADGE[bill.status]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
        <Link href="/states" className="hover:text-teal-600 transition-colors">States</Link>
        <span>/</span>
        <Link href={`/states/${stateCode}`} className="hover:text-teal-600 transition-colors">{stateName}</Link>
        <span>/</span>
        <Link href={`/bills/${stateCode}`} className="hover:text-teal-600 transition-colors">Bills</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">{bill.billNumber}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start gap-3 mb-4 flex-wrap">
              <span className="text-sm font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded-full">
                {bill.billNumber}
              </span>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {bill.state}
              </span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${badge.className}`}>
                {badge.label}
              </span>
              {bill.industryTags?.map(tag => (
                <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl font-serif font-bold text-slate-900 mb-3 leading-snug">
              {bill.title}
            </h1>

            <p className="text-slate-600 leading-relaxed mb-6">{bill.description}</p>

            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
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
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Sponsors
              </h2>
              <div className="space-y-2">
                {bill.sponsors.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-800">{s.name}</span>
                    {s.party && (
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        s.party === 'D' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>{s.party}</span>
                    )}
                    {s.district && <span className="text-slate-400">{s.district}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {bill.history.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Legislative history
              </h2>
              <ol className="space-y-3">
                {[...bill.history].reverse().map((h, i) => (
                  <li key={i} className="flex gap-4 text-sm">
                    <span className="shrink-0 text-slate-400 w-28">{formatDate(h.date)}</span>
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
              <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
                Industry discussions ({discussions.length})
              </h2>
              <div className="space-y-4">
                {discussions.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-teal-500 rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2">Take action</h3>
            <p className="text-sm text-teal-100 mb-4">
              Follow this bill, join a coalition, or contact your representative.
            </p>
            <div className="space-y-2">
              <Link
                href="/join"
                className="w-full flex justify-center px-4 py-2 rounded-lg bg-white text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors"
              >
                Follow this bill
              </Link>
              <a
                href={bill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center px-4 py-2 rounded-lg bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 transition-colors"
              >
                View on legislature.gov ↗
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Bill stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: bill.followCount ?? 0, label: 'Following',   color: 'text-teal-600' },
                { value: bill.discussionCount ?? 0, label: 'Discussions', color: 'text-purple-600' },
                { value: coalitions.length, label: 'Coalitions',   color: 'text-gold-600' },
                { value: bill.sponsors.length, label: 'Sponsors',     color: 'text-slate-600' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {coalitions.length > 0 && (
            <CoalitionPanel coalitions={coalitions} />
          )}
        </aside>
      </div>
    </div>
  )
}
