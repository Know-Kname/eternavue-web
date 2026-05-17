import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { STATUS_BADGE } from '@/lib/bill-utils'
import { BillStatusBar } from './BillStatusBar'
import type { Bill } from '@/lib/types'

interface BillCardProps {
  bill: Bill
  compact?: boolean
}

export function BillCard({ bill, compact }: BillCardProps) {
  const badge = STATUS_BADGE[bill.status]
  const href = `/bills/${bill.state}/${bill.id}`

  return (
    <Link href={href} className="block">
      <article className="bg-white rounded-xl border border-slate-200 p-5 hover:border-gold-400 hover:shadow-sm transition-all">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full">
              {bill.billNumber}
            </span>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {bill.state}
            </span>
            {bill.industryTags?.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 mb-1 leading-snug">
          {bill.title}
        </h3>

        {!compact && (
          <>
            <p className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">
              {bill.description}
            </p>
            <div className="mb-3">
              <BillStatusBar status={bill.status} />
            </div>
          </>
        )}

        <p className="text-xs text-slate-400 mb-3">
          {formatDate(bill.lastActionDate)} — {bill.lastAction}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
          {bill.followCount !== undefined && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 3v10M3 8h10"/>
              </svg>
              {bill.followCount} following
            </span>
          )}
          {bill.discussionCount !== undefined && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2h12v9H2zM5 14l3-3h5"/>
              </svg>
              {bill.discussionCount} discussions
            </span>
          )}
          <span className="ml-auto text-teal-600 font-medium hover:text-teal-700">
            Read more →
          </span>
        </div>
      </article>
    </Link>
  )
}
