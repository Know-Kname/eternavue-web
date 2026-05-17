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
      <article className="hover:border-gold-400 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gold-600 bg-gold-50 rounded-full px-2 py-0.5 text-xs font-bold">
              {bill.billNumber}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              {bill.state}
            </span>
            {bill.industryTags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        <h3 className="mb-1 text-base leading-snug font-semibold text-slate-900">{bill.title}</h3>

        {!compact && (
          <>
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
              {bill.description}
            </p>
            <div className="mb-3">
              <BillStatusBar status={bill.status} />
            </div>
          </>
        )}

        <p className="mb-3 text-xs text-slate-400">
          {formatDate(bill.lastActionDate)} — {bill.lastAction}
        </p>

        <div className="flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
          {bill.followCount !== undefined && (
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
              {bill.followCount} following
            </span>
          )}
          {bill.discussionCount !== undefined && (
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 2h12v9H2zM5 14l3-3h5" />
              </svg>
              {bill.discussionCount} discussions
            </span>
          )}
          <span className="ml-auto font-medium text-teal-600 hover:text-teal-700">Read more →</span>
        </div>
      </article>
    </Link>
  )
}
