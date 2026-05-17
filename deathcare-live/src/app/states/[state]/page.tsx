import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMockStateHub } from '@/lib/mock-community'
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
  const { STATE_NAMES } = await import('@/lib/mock-community')
  return Object.keys(STATE_NAMES).map(state => ({ state }))
}

export const revalidate = 3600

export default async function StateHubPage({ params }: PageProps) {
  const { state } = await params
  const hub = getMockStateHub(state.toUpperCase())
  if (!hub) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/states" className="hover:text-teal-600 transition-colors">States</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">{hub.stateName}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-white mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-1">{hub.stateName}</h1>
            <p className="text-teal-100 text-sm">Deathcare Industry Hub</p>
            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-2xl font-bold">{hub.activeBillCount}</p>
                <p className="text-teal-200 text-xs mt-0.5">Active bills</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{hub.verifiedOperatorCount}</p>
                <p className="text-teal-200 text-xs mt-0.5">Verified operators</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{hub.coalitions.length}</p>
                <p className="text-teal-200 text-xs mt-0.5">Active coalitions</p>
              </div>
            </div>
          </div>
          <Link
            href="/join"
            className="shrink-0 self-start px-5 py-2.5 rounded-xl bg-white text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors"
          >
            Join as {hub.state} operator
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bills */}
          {hub.bills.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-bold text-slate-900">Active Legislation</h2>
                <Link
                  href={`/bills/${hub.state}`}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  All {hub.state} bills →
                </Link>
              </div>
              <div className="space-y-4">
                {hub.bills.map(bill => (
                  <BillCard key={bill.id} bill={bill} />
                ))}
              </div>
            </section>
          )}

          {/* Community posts */}
          {hub.topPosts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-bold text-slate-900">Recent Discussions</h2>
                <Link
                  href={`/feed?state=${hub.state}`}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  See all {hub.state} posts →
                </Link>
              </div>
              <div className="space-y-4">
                {hub.topPosts.map(post => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Coalitions */}
          {hub.coalitions.length > 0 && (
            <CoalitionPanel coalitions={hub.coalitions} />
          )}

          {/* Quick links */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/bills/${hub.state}`}
                  className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                >
                  All {hub.stateName} bills
                </Link>
              </li>
              <li>
                <Link
                  href={`/feed?state=${hub.state}`}
                  className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                >
                  {hub.stateName} feed
                </Link>
              </li>
              <li>
                <Link
                  href={`/directory?state=${hub.state}`}
                  className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
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
