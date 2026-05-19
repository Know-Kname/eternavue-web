import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MOCK_POSTS, MOCK_PROFILES } from '@/lib/mock-community'
import { VerifiedBadge } from '@/components/community/VerifiedBadge'
import { formatDistanceToNow } from '@/lib/utils'
import type { PostKind, UserRole } from '@/lib/types'

export const revalidate = 3600

export function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({ postId: post.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>
}): Promise<Metadata> {
  const { postId } = await params
  const post = MOCK_POSTS.find((p) => p.id === postId)
  if (!post) return { title: 'Post not found' }
  const author = post.isAnonymous ? 'Anonymous' : post.author.displayName
  const snippet = post.body.slice(0, 140) + (post.body.length > 140 ? '…' : '')
  return {
    title: `${author} on deathcare.live`,
    description: snippet,
  }
}

const KIND_CONFIG: Record<PostKind, { label: string; pill: string; border: string; accent: string }> = {
  note: {
    label: 'Field Note',
    pill: 'bg-slate-100 text-slate-600',
    border: 'border-l-slate-300',
    accent: 'text-slate-600',
  },
  analysis: {
    label: 'Analysis',
    pill: 'bg-teal-50 text-teal-700',
    border: 'border-l-teal-400',
    accent: 'text-teal-700',
  },
  position: {
    label: 'Position',
    pill: 'bg-amber-50 text-amber-700',
    border: 'border-l-amber-400',
    accent: 'text-amber-700',
  },
  question: {
    label: 'Question',
    pill: 'bg-purple-50 text-purple-700',
    border: 'border-l-purple-400',
    accent: 'text-purple-700',
  },
  report: {
    label: 'Report',
    pill: 'bg-green-50 text-green-700',
    border: 'border-l-green-400',
    accent: 'text-green-700',
  },
}

const ROLE_AVATAR: Record<UserRole, { bg: string; text: string }> = {
  director: { bg: 'bg-teal-100', text: 'text-teal-700' },
  operator: { bg: 'bg-sky-100', text: 'text-sky-700' },
  supplier: { bg: 'bg-amber-100', text: 'text-amber-700' },
  association: { bg: 'bg-purple-100', text: 'text-purple-700' },
  educator: { bg: 'bg-green-100', text: 'text-green-700' },
  observer: { bg: 'bg-slate-100', text: 'text-slate-500' },
}

// Deterministic mock comments keyed by post ID
const MOCK_COMMENTS: Record<string, { id: string; authorIdx: number; body: string; ts: string }[]> = {
  post1: [
    {
      id: 'c1a',
      authorIdx: 1,
      body: "Agreed on the sliding scale — flat 10% cap disproportionately hits small operators who've already invested staff time and prep work. Need to differentiate between cancellations before vs. after service delivery begins.",
      ts: '2026-05-10T16:00:00Z',
    },
    {
      id: 'c1b',
      authorIdx: 5,
      body: 'The 30-day window is the part that worries me most for Flint. Families in financial crisis will use it as a payment delay tactic. Has anyone modeled what a 10-day window would do to the consumer protection goal?',
      ts: '2026-05-10T17:30:00Z',
    },
    {
      id: 'c1c',
      authorIdx: 0,
      body: 'Tom — the NFDA testified that 30 days aligns with credit card dispute windows. The consumer pressure was real. I think the fight is better spent on the fee cap language.',
      ts: '2026-05-10T18:45:00Z',
    },
  ],
  post2: [
    {
      id: 'c2a',
      authorIdx: 0,
      body: "Digital portals for beneficiary access would be a game changer. Families shouldn't have to call to confirm their preneed money is safe.",
      ts: '2026-05-09T12:00:00Z',
    },
    {
      id: 'c2b',
      authorIdx: 4,
      body: 'From an academic standpoint, the annual audit requirement is what gives this bill teeth. Without it, disclosure is just a checkbox.',
      ts: '2026-05-09T14:00:00Z',
    },
  ],
  post3: [
    {
      id: 'c3a',
      authorIdx: 3,
      body: 'Seeing similar trends in our supplier data — direct cremation orders from Michigan homes up significantly. The margin compression is real.',
      ts: '2026-05-08T10:30:00Z',
    },
    {
      id: 'c3b',
      authorIdx: 2,
      body: 'Ohio saw the same shift. Direct cremation crossed 60% of total dispositions in Columbus last year. HB 4133 is correctly identifying a structural change.',
      ts: '2026-05-08T11:00:00Z',
    },
  ],
  post4: [
    {
      id: 'c4a',
      authorIdx: 0,
      body: "The Ohio wastewater discharge standards are solid. EGLE would accept something similar in Michigan — I've had preliminary conversations.",
      ts: '2026-05-07T18:00:00Z',
    },
    {
      id: 'c4b',
      authorIdx: 1,
      body: 'We submitted formal comments to the Michigan committee citing Ohio HB 312 specifically. The more operators reference it, the better.',
      ts: '2026-05-07T19:30:00Z',
    },
  ],
  post5: [
    {
      id: 'c5a',
      authorIdx: 4,
      body: "The MBMS rule-making clock doesn't start until the governor signs. If that's late summer, you're looking at mid-2027 at the earliest for updated CE requirements.",
      ts: '2026-05-06T13:00:00Z',
    },
  ],
  post7: [
    {
      id: 'c7a',
      authorIdx: 4,
      body: "The demand data you're seeing lines up with what I teach. Younger families are driving this — it's a cultural shift, not a price-only story.",
      ts: '2026-05-04T15:00:00Z',
    },
    {
      id: 'c7b',
      authorIdx: 0,
      body: "Is there a waiting list model that works financially? Curious how you're structuring the pricing for the conservation section.",
      ts: '2026-05-04T16:30:00Z',
    },
  ],
  post8: [
    {
      id: 'c8a',
      authorIdx: 5,
      body: "SB 892 on the Senate floor is the one to watch. If it passes with the audit requirement intact, that's a real policy win.",
      ts: '2026-05-03T08:00:00Z',
    },
    {
      id: 'c8b',
      authorIdx: 2,
      body: 'Ohio operators are watching Michigan closely on HB 4521. If it passes here, it gives Ohio momentum for a companion bill.',
      ts: '2026-05-03T09:00:00Z',
    },
  ],
}

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const post = MOCK_POSTS.find((p) => p.id === postId)
  if (!post) notFound()

  const kind = KIND_CONFIG[post.kind]
  const avatar = ROLE_AVATAR[post.author.role]
  const isAnon = post.isAnonymous
  const displayName = isAnon ? 'Anonymous' : post.author.displayName
  const comments = MOCK_COMMENTS[postId] ?? []

  // Related posts: same bill or same state, excluding current
  const related = MOCK_POSTS.filter(
    (p) =>
      p.id !== postId &&
      (post.billId ? p.billId === post.billId : false || p.state === post.state),
  ).slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back nav */}
      <Link
        href="/feed"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-teal-600"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 3L5 8l5 5" />
        </svg>
        Back to feed
      </Link>

      {/* Main post card */}
      <article className={`rounded-2xl border border-l-4 border-slate-200 bg-white ${kind.border} p-6 shadow-sm`}>
        {/* Author row */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold ${avatar.bg} ${avatar.text} ring-2 ring-white shadow-sm`}
            >
              {displayName[0]}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                {!isAnon ? (
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-semibold text-slate-900 transition-colors hover:text-teal-600"
                  >
                    {displayName}
                  </Link>
                ) : (
                  <span className="font-semibold text-slate-500">{displayName}</span>
                )}
                {!isAnon && (
                  <VerifiedBadge role={post.author.role} verified={!!post.author.verifiedAt} />
                )}
                {post.author.state && (
                  <Link
                    href={`/states/${post.author.state}`}
                    className="rounded bg-slate-50 px-1.5 py-0.5 text-xs text-slate-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
                  >
                    {post.author.state}
                  </Link>
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-400">
                {formatDistanceToNow(post.createdAt)}
                {!isAnon && post.author.yearsActive && (
                  <> · {post.author.yearsActive} years in deathcare</>
                )}
              </p>
            </div>
          </div>
          <span className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${kind.pill}`}>
            {kind.label}
          </span>
        </div>

        {/* Bill link */}
        {post.billId && post.billTitle && (
          <Link
            href={`/bills/${post.state ?? post.author.state ?? 'MI'}/${post.billId}`}
            className="text-gold-600 hover:text-gold-700 bg-gold-50 hover:bg-gold-100 mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors"
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 2h8a1 1 0 011 1v11l-2-1-2 1-2-1-2 1V3a1 1 0 011-1z" />
              <path d="M6 6h4M6 9h4" />
            </svg>
            {post.billTitle}
          </Link>
        )}

        {/* Body */}
        <p className="text-base leading-relaxed text-slate-800">{post.body}</p>

        {/* Actions bar */}
        <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-400">
          <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-teal-50 hover:text-teal-600">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 3l1.5 3 3.5.5-2.5 2.5.5 3.5L8 11l-3 1.5.5-3.5L3 6.5l3.5-.5z" />
            </svg>
            <span className="font-semibold text-slate-700">{post.upvotes}</span>
            <span>upvotes</span>
          </button>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2h12v9H2zM5 14l3-3h5" />
            </svg>
            {post.commentCount} {post.commentCount === 1 ? 'reply' : 'replies'}
          </span>
          <Link
            href={`/join`}
            className="ml-auto text-xs font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            Join to reply →
          </Link>
        </div>
      </article>

      {/* Author bio card (non-anon only) */}
      {!isAnon && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatar.bg} ${avatar.text}`}
            >
              {displayName[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/profile/${post.author.username}`}
                  className="font-semibold text-slate-900 hover:text-teal-600"
                >
                  {displayName}
                </Link>
                <VerifiedBadge role={post.author.role} verified={!!post.author.verifiedAt} />
              </div>
              {post.author.bio && (
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{post.author.bio}</p>
              )}
              {post.author.expertise && post.author.expertise.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {post.author.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={`/profile/${post.author.username}`}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              View profile
            </Link>
          </div>
        </div>
      )}

      {/* Comments section */}
      <section className="mt-8">
        <h2 className="mb-4 font-serif text-lg font-bold text-slate-900">
          {comments.length > 0 ? `${comments.length} replies` : 'Replies'}
        </h2>

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => {
              const commenter = MOCK_PROFILES[comment.authorIdx]
              const commentAvatar = ROLE_AVATAR[commenter.role]
              return (
                <div key={comment.id} className="flex gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${commentAvatar.bg} ${commentAvatar.text}`}
                  >
                    {commenter.displayName[0]}
                  </div>
                  <div className="min-w-0 flex-1 rounded-xl bg-slate-50 px-4 py-3">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/profile/${commenter.username}`}
                        className="text-sm font-semibold text-slate-900 hover:text-teal-600"
                      >
                        {commenter.displayName}
                      </Link>
                      <VerifiedBadge role={commenter.role} verified={!!commenter.verifiedAt} />
                      <span className="text-xs text-slate-400">{formatDistanceToNow(comment.ts)}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700">{comment.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No replies yet. Be the first to respond.</p>
        )}

        {/* Reply CTA */}
        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
          <p className="text-sm text-slate-500">
            <Link href="/join" className="font-semibold text-teal-600 hover:text-teal-700">
              Join deathcare.live
            </Link>{' '}
            to reply to this post. Verified members only.
          </p>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-serif text-lg font-bold text-slate-900">
            {post.billId ? 'More on this bill' : `More from ${post.state}`}
          </h2>
          <div className="space-y-3">
            {related.map((rel) => {
              const relKind = KIND_CONFIG[rel.kind]
              const relAvatar = ROLE_AVATAR[rel.author.role]
              const relName = rel.isAnonymous ? 'Anonymous' : rel.author.displayName
              return (
                <Link
                  key={rel.id}
                  href={`/feed/${rel.id}`}
                  className={`flex gap-3 rounded-xl border border-l-4 border-slate-200 bg-white p-4 transition-all hover:shadow-sm ${relKind.border}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${relAvatar.bg} ${relAvatar.text}`}
                  >
                    {relName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-semibold text-slate-900">{relName}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${relKind.pill}`}>
                        {relKind.label}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-slate-500">{rel.body}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <Link
            href="/feed"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            View all posts →
          </Link>
        </section>
      )}
    </div>
  )
}
