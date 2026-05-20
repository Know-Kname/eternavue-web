import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-wpgraphql-smart-cache-secret')

  if (!config.revalidation.secret || secret !== config.revalidation.secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const tag: string = body?.tag ?? 'wp'
    revalidateTag(tag, {})
    return NextResponse.json({ revalidated: true, tag })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
