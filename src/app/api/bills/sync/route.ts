import { NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { searchBills } from '@/lib/legiscan'
import { ACTIVE_STATES } from '@/lib/mock-community'

// Called by Vercel cron: 0 */6 * * * (every 6 hours)
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${config.revalidation.secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!config.legiscan.apiKey) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      message: 'LEGISCAN_API_KEY not set — skipping sync',
    })
  }

  const results: Record<string, number> = {}

  for (const state of ACTIVE_STATES) {
    const bills = await searchBills(state, 'cremation OR burial OR funeral OR cemetery')
    results[state] = bills?.length ?? 0
  }

  return NextResponse.json({ ok: true, synced: results })
}

export async function GET() {
  return NextResponse.json({ status: 'Bills sync endpoint ready. POST to trigger.' })
}
