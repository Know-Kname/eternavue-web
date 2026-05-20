'use client'

import { useState } from 'react'
import Link from 'next/link'

const IS_CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

interface BillFollowProps {
  billId: string
  billNumber: string
}

function JoinLink({ billNumber }: { billNumber: string }) {
  return (
    <Link
      href="/join"
      className="flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
    >
      Follow {billNumber}
    </Link>
  )
}

function FollowButtonAuthed({ billId, billNumber }: BillFollowProps) {
  // Safe: this component only mounts inside ClerkProvider (IS_CLERK_ENABLED guard above)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useUser } = require('@clerk/nextjs') as typeof import('@clerk/nextjs')
  const { isSignedIn } = useUser()
  const [following, setFollowing] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isSignedIn) return <JoinLink billNumber={billNumber} />

  const toggle = async () => {
    setLoading(true)
    try {
      await fetch('/api/bills/follow', {
        method: following ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId }),
      })
      setFollowing((f) => !f)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex w-full justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${
        following
          ? 'border border-white/30 bg-white/20 text-white hover:bg-white/30'
          : 'bg-white text-teal-700 hover:bg-teal-50'
      }`}
    >
      {loading ? 'Saving…' : following ? '✓ Following' : `Follow ${billNumber}`}
    </button>
  )
}

export function BillFollowButton({ billId, billNumber }: BillFollowProps) {
  if (IS_CLERK_ENABLED) return <FollowButtonAuthed billId={billId} billNumber={billNumber} />
  return <JoinLink billNumber={billNumber} />
}
