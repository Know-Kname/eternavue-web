import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

const isClerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

interface PostBody {
  kind: 'note' | 'analysis' | 'position' | 'question' | 'report'
  body: string
  state?: string
  billId?: string
  isAnonymous?: boolean
}

export async function POST(req: NextRequest) {
  if (isClerkEnabled) {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const data = (await req.json()) as PostBody

  if (!data.body || data.body.trim().length < 10) {
    return NextResponse.json(
      { error: 'Post body must be at least 10 characters.' },
      { status: 400 }
    )
  }

  if (data.body.length > 3000) {
    return NextResponse.json(
      { error: 'Post body must be under 3,000 characters.' },
      { status: 400 }
    )
  }

  // TODO: insert into Supabase posts table
  // const supabase = createClient()
  // const { data: post, error } = await supabase.from('posts').insert({ ... }).select().single()

  return NextResponse.json({
    id: `mock-${Date.now()}`,
    kind: data.kind,
    body: data.body,
    state: data.state ?? null,
    billId: data.billId ?? null,
    isAnonymous: data.isAnonymous ?? false,
    upvotes: 0,
    createdAt: new Date().toISOString(),
  })
}
