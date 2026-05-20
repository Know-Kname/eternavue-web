import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMockStateHub, MOCK_BILLS, STATE_NAMES } from '@/lib/mock-community'
import { TERMINAL_STATUSES } from '@/lib/bill-utils'
import { BillCard } from '@/components/legislative/BillCard'
import { PostCard } from '@/components/community/PostCard'
import { CoalitionPanel } from '@/components/legislative/CoalitionPanel'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const hub = getMockStateHub(state.toUpperCase())
  if (!hub) return {}
  return {
    title: `${hub.stateName} — Deathcare Legislation & Community`,
    description: `Track ${hub.activeBillCount} active deathcare bills in ${hub.stateName}. Join ${hub.verifiedOperatorCount} verified operators discussing the latest regulatory changes.`,
  }
}

export async function generateStaticParams() {
  // Only pre-render states with actual bill data — avoids 15 empty build pages
  const activeStateCodes = [
    ...new Set(MOCK_BILLS.filter((b) => !TERMINAL_STATUSES.includes(b.status)).map((b) => b.state)),
  ]
  // Also include states in STATE_NAMES that have any bills (even terminal)
  const allWithData = [...new Set([...activeStateCodes, ...MOCK_BILLS.map((b) => b.state)])]
  return allWithData.filter((s) => STATE_NAMES[s]).map((state) => ({ state }))
}

export const revalidate = 3600

export default async function StateHubPage({ params }: PageProps) {
  const { state } = await params
  const hub = getMockStateHub(state.toUpperCase())
  if (!hub) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/states" className="transition-colors hover:text-teal-600">
          States
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{hub.stateName}</span>
      </nav>

      <div className="mb-8 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="mb-1 font-serif text-3xl font-bold">{hub.stateName}</h1>
            <p className="text-sm text-teal-100">Deathcare Industry Hub</p>
            <div className="mt-4 flex gap-6">
              {[
                { value: hub.activeBillCount, label: 'Active bills' },
                { value: hub.verifiedOperatorCount, label: 'Verified operators' },
                { value: hub.coalitions.length, label: 'Active coalitions' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="mt-0.5 text-xs text-teal-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/join"
            className="shrink-0 self-start rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
          >
            Join as {hub.state} operator
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {hub.bills.length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-slate-900">Active Legislation</h2>
                <Link
                  href={`/bills/${hub.state}`}
                  className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
                >
                  All {hub.state} bills →
                </Link>
              </div>
              <div className="space-y-4">
                {hub.bills.map((bill) => (
                  <BillCard key={bill.id} bill={bill} />
                ))}
              </div>
            </section>
          )}

          {hub.topPosts.length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-slate-900">Recent Discussions</h2>
                <Link
                  href={`/feed?state=${hub.state}`}
                  className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
                >
                  See all {hub.state} posts →
                </Link>
              </div>
              <div className="space-y-4">
                {hub.topPosts.map((post) => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          {hub.coalitions.length > 0 && <CoalitionPanel coalitions={hub.coalitions} />}

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/bills/${hub.state}`}
                  className="text-sm text-teal-600 transition-colors hover:text-teal-700"
                >
                  All {hub.stateName} bills
                </Link>
              </li>
              <li>
                <Link
                  href={`/feed?state=${hub.state}`}
                  className="text-sm text-teal-600 transition-colors hover:text-teal-700"
                >
                  {hub.stateName} feed
                </Link>
              </li>
              <li>
                <Link
                  href={`/directory?state=${hub.state}`}
                  className="text-sm text-teal-600 transition-colors hover:text-teal-700"
                >
                  {hub.stateName} directory
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
