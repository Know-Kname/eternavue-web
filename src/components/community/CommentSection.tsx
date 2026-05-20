'use client'

import { useState } from 'react'
import Link from 'next/link'
import { VerifiedBadge } from '@/components/community/VerifiedBadge'
import { formatDistanceToNow } from '@/lib/utils'
import type { UserRole } from '@/lib/types'

const IS_CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export interface CommentData {
  id: string
  displayName: string
  username?: string
  role: UserRole
  verified: boolean
  body: string
  ts: string
}

const ROLE_AVATAR: Record<UserRole, { bg: string; text: string }> = {
  director: { bg: 'bg-teal-100', text: 'text-teal-700' },
  operator: { bg: 'bg-sky-100', text: 'text-sky-700' },
  supplier: { bg: 'bg-amber-100', text: 'text-amber-700' },
  association: { bg: 'bg-purple-100', text: 'text-purple-700' },
  educator: { bg: 'bg-green-100', text: 'text-green-700' },
  observer: { bg: 'bg-slate-100', text: 'text-slate-500' },
}

function SignedOutCTA() {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
      <p className="text-sm text-slate-500">
        <Link href="/join" className="font-semibold text-teal-600 hover:text-teal-700">
          Join deathcare.live
        </Link>{' '}
        to reply to this post. Verified members only.
      </p>
    </div>
  )
}

interface ReplyFormAuthedProps {
  postId: string
  onAdded: (comment: CommentData) => void
}

function ReplyFormAuthed({ postId, onAdded }: ReplyFormAuthedProps) {
  // Safe: only mounts inside ClerkProvider (IS_CLERK_ENABLED guard in parent)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useUser } = require('@clerk/nextjs') as typeof import('@clerk/nextjs')
  const { isSignedIn, user } = useUser()
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isSignedIn) return <SignedOutCTA />

  const displayName =
    user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress ?? 'You'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, body }),
      })
      if (!res.ok) throw new Error('Failed to post reply')
      setBody('')
      onAdded({
        id: `pending-${Date.now()}`,
        displayName,
        role: 'observer',
        verified: false,
        body: body.trim(),
        ts: new Date().toISOString(),
      })
    } catch {
      setError('Could not post reply. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-5">
      <div className="flex gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${ROLE_AVATAR.observer.bg} ${ROLE_AVATAR.observer.text}`}
        >
          {displayName[0]?.toUpperCase() ?? '?'}
        </div>
        <div className="flex-1">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add a reply… (verified members only)"
            maxLength={1000}
            rows={3}
            disabled={loading}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-teal-400 focus:bg-white focus:outline-none disabled:opacity-60"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">{body.length}/1000</span>
            <div className="flex items-center gap-2">
              {error && <span className="text-xs text-red-500">{error}</span>}
              <button
                type="submit"
                disabled={loading || !body.trim()}
                className="rounded-lg bg-teal-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? 'Posting…' : 'Post reply'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

interface CommentSectionProps {
  postId: string
  initialComments: CommentData[]
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>(initialComments)

  const handleAdded = (comment: CommentData) => {
    setComments((prev) => [...prev, comment])
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 font-serif text-lg font-bold text-slate-900">
        {comments.length > 0 ? `${comments.length} repl${comments.length === 1 ? 'y' : 'ies'}` : 'Replies'}
      </h2>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => {
            const av = ROLE_AVATAR[comment.role]
            return (
              <div key={comment.id} className="flex gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${av.bg} ${av.text}`}
                >
                  {comment.displayName[0]}
                </div>
                <div className="min-w-0 flex-1 rounded-xl bg-slate-50 px-4 py-3">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    {comment.username ? (
                      <Link
                        href={`/profile/${comment.username}`}
                        className="text-sm font-semibold text-slate-900 hover:text-teal-600"
                      >
                        {comment.displayName}
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-slate-900">
                        {comment.displayName}
                      </span>
                    )}
                    <VerifiedBadge role={comment.role} verified={comment.verified} />
                    <span className="text-xs text-slate-400">
                      {formatDistanceToNow(comment.ts)}
                    </span>
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

      {IS_CLERK_ENABLED ? (
        <ReplyFormAuthed postId={postId} onAdded={handleAdded} />
      ) : (
        <SignedOutCTA />
      )}
    </section>
  )
}
