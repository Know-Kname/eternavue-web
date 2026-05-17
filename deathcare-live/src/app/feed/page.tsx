import Link from 'next/link'
import { MOCK_BILLS, MOCK_POSTS, ACTIVE_STATES, STATE_NAMES, getMockPosts } from '@/lib/mock-community'
import { TERMINAL_STATUSES } from '@/lib/bill-utils'
import { PostCard } from '@/components/community/PostCard'
import { FeedFilter } from '@/components/community/FeedFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Feed — Industry Notes, Analysis & Positions',
  description:
    'Real-time field notes, policy analyses, and position statements from verified deathcare operators across the country.',
}

export const revalidate = 300

function getActiveSidebarStats() {
  return ACTIVE_STATES.map(code => ({
    state: code,
    name: STATE_NAMES[code],
    bills: MOCK_BILLS.filter(b => b.state === code && !TERMINAL_STATUSES.includes(b.status)).length,
    posts: MOCK_POSTS.filter(p => p.state === code).length,
  }))
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; state?: string }>
}) {
  const params = await searchParams
  const posts = getMockPosts({
    kind: params.kind || undefined,
    state: params.state || undefined,
  })
  const activeStates = getActiveSidebarStats()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Community Feed</h1>
            <Link
              href="/join"
              className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors"
            >
              Post to Feed
            </Link>
          </div>

          <FeedFilter />

          {posts.length > 0 ? (
            <div className="space-y-4 mt-4">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg font-medium">No posts yet</p>
              <p className="text-sm mt-1">Be the first to share a field note or analysis.</p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-teal-50 rounded-xl border border-teal-100 p-5">
            <h2 className="text-sm font-semibold text-teal-800 mb-2">About this feed</h2>
            <p className="text-sm text-teal-700 leading-relaxed">
              Verified deathcare professionals share field notes, policy analyses, bill positions, and questions. This is the intelligence layer missing from the industry.
            </p>
            <Link
              href="/join"
              className="mt-3 inline-flex text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              Request verified access →
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Active states</h2>
            <div className="space-y-2">
              {activeStates.map(s => (
                <Link
                  key={s.state}
                  href={`/states/${s.state}`}
                  className="flex items-center justify-between text-sm text-slate-600 hover:text-teal-600 transition-colors py-1"
                >
                  <span className="font-medium">{s.state}</span>
                  <span className="text-xs text-slate-400">
                    {s.bills > 0 ? `${s.bills} bills · ` : ''}{s.posts} posts
                  </span>
                </Link>
              ))}
              <Link
                href="/states"
                className="text-xs text-teal-600 hover:text-teal-700 font-medium mt-1 inline-block"
              >
                View all states →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">Verified members only</h2>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Post field notes, vote on positions, join coalitions, and access full discussion threads.
            </p>
            <Link
              href="/join"
              className="w-full inline-flex justify-center px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors"
            >
              Apply for access
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
