import type { BillStatus } from './types'

export const TERMINAL_STATUSES: BillStatus[] = ['signed', 'failed', 'vetoed']

export const STATUS_BADGE: Record<BillStatus, { label: string; className: string }> = {
  introduced: { label: 'Introduced', className: 'bg-slate-100 text-slate-600' },
  committee: { label: 'In Committee', className: 'bg-amber-50 text-amber-700' },
  floor: { label: 'Floor Vote', className: 'bg-teal-50 text-teal-700' },
  passed: { label: 'Passed', className: 'bg-teal-100 text-teal-800' },
  signed: { label: 'Signed ✓', className: 'bg-green-100 text-green-800' },
  vetoed: { label: 'Vetoed', className: 'bg-red-100 text-red-700' },
  failed: { label: 'Failed', className: 'bg-red-100 text-red-700' },
  'carried-over': { label: 'Carried Over', className: 'bg-slate-100 text-slate-600' },
}
