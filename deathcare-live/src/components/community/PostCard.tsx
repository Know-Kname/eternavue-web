import Link from 'next/link'
import { formatDistanceToNow } from '@/lib/utils'
import { VerifiedBadge } from './VerifiedBadge'
import type { Post, PostKind } from '@/lib/types'

const KIND_CONFIG: Record<PostKind, { label: string; className: string }> = {
  note:     { label: 'Field Note',  className: 'bg-slate-100 text-slate-600' },
  analysis: { label: 'Analysis',   className: 'bg-teal-50 text-teal-700' },
  position: { label: 'Position',   className: 'bg-amber-50 text-amber-700' },
  question: { label: 'Question',   className: 'bg-purple-50 text-purple-700' },
  report:   { label: 'Report',     className: 'bg-green-50 text-green-700' },
}

interface PostCardProps {
  post: Post
  compact?: boolean
}

export function PostCard({ post, compact }: PostCardProps) {
  const kind = KIND_CONFIG[post.kind]
  const author = post.isAnonymous
    ? { displayName: 'Anonymous', role: post.author.role, verifiedAt: null }
    : post.author

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 hover:border-teal-200 transition-colors">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0 text-teal-700 font-semibold text-sm">
            {author.displayName[0]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {!post.isAnonymous ? (
                <Link
                  href={`/profile/${post.author.username}`}
                  className="text-sm font-semibold text-slate-900 hover:text-teal-600 transition-colors"
                >
                  {author.displayName}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-slate-900">{author.displayName}</span>
              )}
              <VerifiedBadge
                role={author.role}
                verified={!!author.verifiedAt}
              />
              {post.author.state && (
                <span className="text-xs text-slate-400">{post.author.state}</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {formatDistanceToNow(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Kind badge */}
        <span className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${kind.className}`}>
          {kind.label}
        </span>
      </div>

      {/* Bill link if anchored */}
      {post.billId && post.billTitle && (
        <Link
          href={`/bills/${post.author.state ?? post.state ?? 'MI'}/${post.billId}`}
          className="inline-flex items-center gap-1 mb-2 text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 2h8a1 1 0 011 1v11l-2-1-2 1-2-1-2 1V3a1 1 0 011-1z"/>
            <path d="M6 6h4M6 9h4"/>
          </svg>
          {post.billTitle}
        </Link>
      )}

      {/* Body */}
      <p className={`text-slate-700 leading-relaxed ${compact ? 'line-clamp-3 text-sm' : 'text-base'}`}>
        {post.body}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
        <button className="flex items-center gap-1 hover:text-teal-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 3l1.5 3 3.5.5-2.5 2.5.5 3.5L8 11l-3 1.5.5-3.5L3 6.5l3.5-.5z"/>
          </svg>
          {post.upvotes}
        </button>
        <button className="flex items-center gap-1 hover:text-teal-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 2h12v9H2zM5 14l3-3h5"/>
          </svg>
          {post.commentCount} {post.commentCount === 1 ? 'reply' : 'replies'}
        </button>
        {post.state && (
          <Link
            href={`/states/${post.state}`}
            className="ml-auto hover:text-teal-600 transition-colors"
          >
            {post.state}
          </Link>
        )}
      </div>
    </article>
  )
}
