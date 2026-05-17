import { config } from './config'
import type { Bill, BillStatus } from './types'

const BASE = 'https://api.legiscan.com/'

type LegiScanStatus = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const STATUS_MAP: Record<LegiScanStatus, BillStatus> = {
  1: 'introduced',
  2: 'committee',
  3: 'floor',
  4: 'passed',
  5: 'signed',
  6: 'vetoed',
  7: 'failed',
  8: 'carried-over',
}

interface LegiScanBillResponse {
  status: string
  bill: {
    bill_id: number
    bill_number: string
    title: string
    description: string
    state: string
    status: LegiScanStatus
    status_date: string
    last_action: string
    last_action_date: string
    url: string
    sponsors: Array<{ name: string; party: string; district: string }>
    history: Array<{ date: string; action: string; chamber: string }>
  }
}

interface LegiScanSearchResponse {
  status: string
  searchresult: {
    results: Array<{
      bill_id: number
      bill_number: string
      title: string
      description: string
      state: string
      last_action: string
      last_action_date: string
      status: LegiScanStatus
      url: string
    }>
  }
}

async function legiscanFetch<T>(op: string, params: Record<string, string>): Promise<T> {
  if (!config.legiscan.apiKey) {
    throw new Error('LEGISCAN_API_KEY not set')
  }
  const url = new URL(BASE)
  url.searchParams.set('key', config.legiscan.apiKey)
  url.searchParams.set('op', op)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  const res = await fetch(url.toString(), { next: { revalidate: config.legiscan.cacheTtlHours * 3600 } })
  if (!res.ok) throw new Error(`LegiScan API error: ${res.status}`)
  return res.json() as Promise<T>
}

export async function getBill(billId: string | number): Promise<Bill | null> {
  try {
    const data = await legiscanFetch<LegiScanBillResponse>('getBill', { id: String(billId) })
    if (data.status !== 'OK' || !data.bill) return null
    const b = data.bill
    return {
      id: String(b.bill_id),
      billNumber: b.bill_number,
      title: b.title,
      description: b.description,
      state: b.state,
      status: STATUS_MAP[b.status] ?? 'introduced',
      statusDate: b.status_date,
      lastAction: b.last_action,
      lastActionDate: b.last_action_date,
      url: b.url,
      sponsors: (b.sponsors ?? []).map(s => ({
        name: s.name,
        party: s.party,
        district: s.district,
      })),
      history: (b.history ?? []).map(h => ({
        date: h.date,
        action: h.action,
        chamber: h.chamber,
      })),
    }
  } catch {
    return null
  }
}

export async function searchBills(
  state: string,
  query: string,
  page = 1
): Promise<Bill[]> {
  try {
    const data = await legiscanFetch<LegiScanSearchResponse>('search', {
      state,
      query,
      page: String(page),
    })
    if (data.status !== 'OK') return []
    return (data.searchresult?.results ?? []).map(r => ({
      id: String(r.bill_id),
      billNumber: r.bill_number,
      title: r.title,
      description: r.description,
      state: r.state,
      status: STATUS_MAP[r.status] ?? 'introduced',
      statusDate: r.last_action_date,
      lastAction: r.last_action,
      lastActionDate: r.last_action_date,
      url: r.url,
      sponsors: [],
      history: [],
    }))
  } catch {
    return []
  }
}

// Returns mock bills when LegiScan API key is absent
export async function getBillsForState(state: string): Promise<Bill[]> {
  if (!config.legiscan.apiKey) {
    const { MOCK_BILLS } = await import('./mock-community')
    return MOCK_BILLS.filter(b => b.state === state)
  }
  const industryTerms = 'funeral cremation cemetery preneed burial embalming death care'
  return searchBills(state, industryTerms)
}
