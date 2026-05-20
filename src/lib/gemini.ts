import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from './config'
import type { Post, Bill } from './types'

const MODEL = 'gemini-2.5-flash'

function getClient() {
  if (!config.gemini.apiKey) return null
  return new GoogleGenerativeAI(config.gemini.apiKey)
}

export interface BriefingInput {
  topPosts: Post[]
  topBills: Bill[]
  weekOf: string
}

export interface BriefingOutput {
  headline: string
  postSummary: string
  billSummary: string
  callToAction: string
}

export async function generateWeeklyBriefing(input: BriefingInput): Promise<BriefingOutput | null> {
  const client = getClient()
  if (!client) return null

  const model = client.getGenerativeModel({ model: MODEL })

  const prompt = `You are an editor for deathcare.live, a professional community platform for the US funeral industry. Write a concise weekly briefing section for the "State of Deathcare" digest email.

Top community posts this week:
${input.topPosts.map((p) => `- [${p.kind.toUpperCase()}] ${p.body.slice(0, 200)}`).join('\n')}

Most-followed legislative bills:
${input.topBills.map((b) => `- ${b.state} ${b.billNumber}: ${b.title} (Status: ${b.status})`).join('\n')}

Week of: ${input.weekOf}

Respond with JSON matching this exact shape (no markdown, raw JSON only):
{
  "headline": "one punchy sentence summarizing the week (max 12 words)",
  "postSummary": "2-3 sentences covering the dominant community theme from the posts above",
  "billSummary": "2-3 sentences on the most significant legislative movement",
  "callToAction": "one sentence inviting readers to engage (max 15 words)"
}`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    return JSON.parse(text) as BriefingOutput
  } catch (err) {
    console.error('[gemini] generateWeeklyBriefing failed:', err)
    return null
  }
}

export async function generateBillAnalysis(bill: Bill): Promise<string | null> {
  const client = getClient()
  if (!client) return null

  const model = client.getGenerativeModel({ model: MODEL })

  const prompt = `You are a policy analyst for deathcare.live, focused on the US funeral industry. Write a plain-language analysis of this state bill for funeral industry professionals.

Bill: ${bill.state} ${bill.billNumber}
Title: ${bill.title}
Description: ${bill.description}
Status: ${bill.status}
Last action: ${bill.lastAction} (${bill.lastActionDate})

Write 3-4 sentences. Cover: what the bill does, who it affects in the deathcare industry, and what professionals should watch for. Do not use jargon. Do not repeat the title verbatim.`

  try {
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (err) {
    console.error('[gemini] generateBillAnalysis failed:', err)
    return null
  }
}
