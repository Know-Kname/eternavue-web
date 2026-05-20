import { NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { generateWeeklyBriefing } from '@/lib/gemini'
import { MOCK_POSTS, MOCK_BILLS } from '@/lib/mock-community'

// Called by Vercel cron: 0 13 * * 1 (Mondays 1 PM UTC)
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${config.revalidation.secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const weekOf = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Use top posts and active bills as briefing source
  const topPosts = MOCK_POSTS.slice(0, 5)
  const topBills = MOCK_BILLS.filter((b) => b.status !== 'signed' && b.status !== 'failed').slice(
    0,
    4
  )

  const aiSummary = config.environment.useGemini
    ? await generateWeeklyBriefing({ topPosts, topBills, weekOf })
    : null

  // TODO: replace with Supabase query once live data is available
  const digestContent = {
    weekOf,
    aiGenerated: !!aiSummary,
    headline: aiSummary?.headline ?? `State of Deathcare — Week of ${weekOf}`,
    postSummary: aiSummary?.postSummary ?? 'Community highlights coming soon.',
    billSummary: aiSummary?.billSummary ?? 'Legislative update coming soon.',
    callToAction: aiSummary?.callToAction ?? 'Join the conversation on deathcare.live.',
    topPosts: topPosts.map((p) => ({ id: p.id, kind: p.kind, body: p.body.slice(0, 200) })),
    topBills: topBills.map((b) => ({ id: b.id, state: b.state, title: b.title })),
  }

  if (!config.resend.apiKey) {
    return NextResponse.json({ ok: true, dryRun: true, digest: digestContent })
  }

  // Resend send would go here — skipping until Resend key is configured
  return NextResponse.json({ ok: true, digest: digestContent })
}

export async function GET() {
  return NextResponse.json({ status: 'Digest endpoint ready. POST to trigger.' })
}
