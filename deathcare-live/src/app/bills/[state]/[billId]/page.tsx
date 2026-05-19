import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_BILLS, MOCK_POSTS, MOCK_COALITIONS, STATE_NAMES } from '@/lib/mock-community'
import { STATUS_BADGE } from '@/lib/bill-utils'
import { formatDate } from '@/lib/utils'
import { BillStatusBar } from '@/components/legislative/BillStatusBar'
import { BillSummary } from '@/components/legislative/BillSummary'
import { BillPositionPoll } from '@/components/legislative/BillPositionPoll'
import { ImpactBadge } from '@/components/legislative/ImpactBadge'
import { ActionKit } from '@/components/legislative/ActionKit'
import { CoalitionPanel } from '@/components/legislative/CoalitionPanel'
import { BillCard } from '@/components/legislative/BillCard'
import { BillFollowButton } from '@/components/legislative/BillFollowButton'
import { PostCard } from '@/components/community/PostCard'
import type { Bill } from '@/lib/types'
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
    description: bill.plainSummary ?? bill.description,
  }
}

export async function generateStaticParams() {
  return MOCK_BILLS.map((b) => ({ state: b.state, billId: b.id }))
}

export const revalidate = 3600

function getRelatedBills(bill: Bill): Bill[] {
  const tags = new Set(bill.industryTags ?? [])
  return MOCK_BILLS.filter((b) => b.id !== bill.id)
    .map((b) => {
      const sharedTags = (b.industryTags ?? []).filter((t) => tags.has(t)).length
      const sameState = b.state === bill.state ? 1 : 0
      return { bill: b, score: sharedTags * 2 + sameState }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.bill)
}

export default async function BillPage({ params }: PageProps) {
  const { state, billId } = await params
  const stateCode = state.toUpperCase()
  const stateName = STATE_NAMES[stateCode]
  const bill = MOCK_BILLS.find((b) => b.id === billId && b.state === stateCode)
  if (!bill || !stateName) notFound()

  const discussions = MOCK_POSTS.filter((p) => p.billId === bill.id)
  const coalitions = MOCK_COALITIONS.filter((c) => c.billId === bill.id)
  const relatedBills = getRelatedBills(bill)
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
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-gold-600 bg-gold-50 rounded-full px-3 py-1 text-sm font-bold">
                {bill.billNumber}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
                {bill.state}
              </span>
              {bill.chamber && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
                  {bill.chamber}
                </span>
              )}
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${badge.className}`}>
                {badge.label}
              </span>
              {bill.impactScore && <ImpactBadge score={bill.impactScore} />}
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

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
              <span>
                Last action: <span className="text-slate-600">{bill.lastAction}</span>
              </span>
              <span>·</span>
              <span>{formatDate(bill.lastActionDate)}</span>
              <span>·</span>
              <a
                href={bill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-600 transition-colors hover:text-teal-700"
              >
                Official bill text ↗
              </a>
            </div>
          </div>

          <BillSummary bill={bill} />

          {bill.positions && <BillPositionPoll positions={bill.positions} />}

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
          <ActionKit bill={bill} />

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

          <div className="rounded-xl bg-teal-500 p-5 text-white">
            <h3 className="mb-2 font-semibold">Stay ahead of this bill</h3>
            <p className="mb-4 text-sm text-teal-100">
              Follow {bill.billNumber} to get an alert every time its status changes.
            </p>
            <BillFollowButton billId={bill.id} billNumber={bill.billNumber} />
          </div>

          {coalitions.length > 0 && <CoalitionPanel coalitions={coalitions} />}

          {relatedBills.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">
                Related bills
              </h3>
              <div className="space-y-3">
                {relatedBills.map((related) => (
                  <BillCard key={related.id} bill={related} compact />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
