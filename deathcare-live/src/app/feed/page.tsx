import Link from 'next/link'
import {
  MOCK_BILLS,
  MOCK_POSTS,
  ACTIVE_STATES,
  STATE_NAMES,
  getMockPosts,
} from '@/lib/mock-community'
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
  return ACTIVE_STATES.map((code) => ({
    state: code,
    name: STATE_NAMES[code],
    bills: MOCK_BILLS.filter((b) => b.state === code && !TERMINAL_STATUSES.includes(b.status))
      .length,
    posts: MOCK_POSTS.filter((p) => p.state === code).length,
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-slate-900">Community Feed</h1>
            <Link
              href="/join"
              className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
            >
              Post to Feed
            </Link>
          </div>

          <FeedFilter />

          {posts.length > 0 ? (
            <div className="mt-4 space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400">
              <p className="text-lg font-medium">No posts yet</p>
              <p className="mt-1 text-sm">Be the first to share a field note or analysis.</p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-teal-100 bg-teal-50 p-5">
            <h2 className="mb-2 text-sm font-semibold text-teal-800">About this feed</h2>
            <p className="text-sm leading-relaxed text-teal-700">
              Verified deathcare professionals share field notes, policy analyses, bill positions,
              and questions. This is the intelligence layer missing from the industry.
            </p>
            <Link
              href="/join"
              className="mt-3 inline-flex text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
            >
              Request verified access →
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-700">Active states</h2>
            <div className="space-y-2">
              {activeStates.map((s) => (
                <Link
                  key={s.state}
                  href={`/states/${s.state}`}
                  className="flex items-center justify-between py-1 text-sm text-slate-600 transition-colors hover:text-teal-600"
                >
                  <span className="font-medium">{s.state}</span>
                  <span className="text-xs text-slate-400">
                    {s.bills > 0 ? `${s.bills} bills · ` : ''}
                    {s.posts} posts
                  </span>
                </Link>
              ))}
              <Link
                href="/states"
                className="mt-1 inline-block text-xs font-medium text-teal-600 hover:text-teal-700"
              >
                View all states →
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-2 text-sm font-semibold text-slate-700">Verified members only</h2>
            <p className="mb-3 text-xs leading-relaxed text-slate-500">
              Post field notes, vote on positions, join coalitions, and access full discussion
              threads.
            </p>
            <Link
              href="/join"
              className="inline-flex w-full justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
            >
              Apply for access
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
