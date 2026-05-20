import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.postId || !body?.body?.trim()) {
    return NextResponse.json({ error: 'Missing postId or body' }, { status: 400 })
  }
  // Mock response — wire to Supabase `comments` table once env vars are set
  return NextResponse.json(
    {
      ok: true,
      comment: {
        id: `c-${Date.now()}`,
        postId: body.postId,
        body: (body.body as string).trim(),
        createdAt: new Date().toISOString(),
      },
    },
    { status: 201 }
  )
}
