import Link from 'next/link'
import { formatDistanceToNow } from '@/lib/utils'
import { VerifiedBadge } from './VerifiedBadge'
import type { Post, PostKind, UserRole } from '@/lib/types'

const KIND_CONFIG: Record<PostKind, { label: string; pill: string; border: string }> = {
  note: { label: 'Field Note', pill: 'bg-slate-100 text-slate-600', border: 'border-l-slate-300' },
  analysis: { label: 'Analysis', pill: 'bg-teal-50 text-teal-700', border: 'border-l-teal-400' },
  position: { label: 'Position', pill: 'bg-amber-50 text-amber-700', border: 'border-l-amber-400' },
  question: {
    label: 'Question',
    pill: 'bg-purple-50 text-purple-700',
    border: 'border-l-purple-400',
  },
  report: { label: 'Report', pill: 'bg-green-50 text-green-700', border: 'border-l-green-400' },
}

const ROLE_AVATAR: Record<UserRole, { bg: string; text: string }> = {
  director: { bg: 'bg-teal-100', text: 'text-teal-700' },
  operator: { bg: 'bg-sky-100', text: 'text-sky-700' },
  supplier: { bg: 'bg-amber-100', text: 'text-amber-700' },
  association: { bg: 'bg-purple-100', text: 'text-purple-700' },
  educator: { bg: 'bg-green-100', text: 'text-green-700' },
  observer: { bg: 'bg-slate-100', text: 'text-slate-500' },
}

interface PostCardProps {
  post: Post
  compact?: boolean
}

export function PostCard({ post, compact }: PostCardProps) {
  const kind = KIND_CONFIG[post.kind]
  const avatar = ROLE_AVATAR[post.author.role]
  const isAnon = post.isAnonymous
  const displayName = isAnon ? 'Anonymous' : post.author.displayName

  return (
    <article
      className={`group rounded-xl border border-l-4 border-slate-200 bg-white ${kind.border} p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-md`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatar.bg} ${avatar.text} ring-2 ring-white`}
          >
            {displayName[0]}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              {!isAnon ? (
                <Link
                  href={`/profile/${post.author.username}`}
                  className="text-sm font-semibold text-slate-900 transition-colors hover:text-teal-600"
                >
                  {displayName}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-slate-500">{displayName}</span>
              )}
              {!isAnon && (
                <VerifiedBadge role={post.author.role} verified={!!post.author.verifiedAt} />
              )}
              {post.author.state && (
                <span className="rounded bg-slate-50 px-1.5 py-0.5 text-xs text-slate-400">
                  {post.author.state}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-slate-400">{formatDistanceToNow(post.createdAt)}</p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${kind.pill}`}
        >
          {kind.label}
        </span>
      </div>

      {post.billId && post.billTitle && (
        <Link
          href={`/bills/${post.author.state ?? post.state ?? 'MI'}/${post.billId}`}
          className="text-gold-600 hover:text-gold-700 bg-gold-50 hover:bg-gold-100 mb-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors"
        >
          <svg
            className="h-3 w-3 shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 2h8a1 1 0 011 1v11l-2-1-2 1-2-1-2 1V3a1 1 0 011-1z" />
            <path d="M6 6h4M6 9h4" />
          </svg>
          {post.billTitle}
        </Link>
      )}

      <p
        className={`leading-relaxed text-slate-700 ${compact ? 'line-clamp-3 text-sm' : 'text-[0.9375rem]'}`}
      >
        {post.body}
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
        <button className="flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors hover:bg-teal-50 hover:text-teal-600">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 3l1.5 3 3.5.5-2.5 2.5.5 3.5L8 11l-3 1.5.5-3.5L3 6.5l3.5-.5z" />
          </svg>
          <span className="font-medium">{post.upvotes}</span>
        </button>
        <button className="flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 2h12v9H2zM5 14l3-3h5" />
          </svg>
          <span>
            {post.commentCount} {post.commentCount === 1 ? 'reply' : 'replies'}
          </span>
        </button>
        {post.state && (
          <Link
            href={`/states/${post.state}`}
            className="ml-auto rounded bg-slate-50 px-2 py-0.5 font-medium transition-colors hover:bg-teal-50 hover:text-teal-600"
          >
            {post.state}
          </Link>
        )}
      </div>
    </article>
  )
}
