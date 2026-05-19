import { NextResponse } from 'next/server'

// Wire to Supabase `bill_follows` table once env vars are set.
// Both endpoints return the new follow state so the client can update optimistically.

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.billId) {
    return NextResponse.json({ error: 'Missing billId' }, { status: 400 })
  }
  return NextResponse.json({ ok: true, billId: body.billId as string, following: true })
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.billId) {
    return NextResponse.json({ error: 'Missing billId' }, { status: 400 })
  }
  return NextResponse.json({ ok: true, billId: body.billId as string, following: false })
}
