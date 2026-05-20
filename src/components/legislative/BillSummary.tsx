import type { Bill } from '@/lib/types'

interface BillSummaryProps {
  bill: Bill
}

export function BillSummary({ bill }: BillSummaryProps) {
  if (!bill.plainSummary) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-serif text-xl font-bold text-slate-900">What this bill does</h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-600">
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6 0l1.3 3.2L10.5 4 8 6.2 8.8 9.5 6 7.8 3.2 9.5 4 6.2 1.5 4l3.2-.8z" />
          </svg>
          AI-assisted · editorially reviewed
        </span>
      </div>

      <p className="mb-5 leading-relaxed text-slate-600">{bill.plainSummary}</p>

      {bill.keyProvisions && bill.keyProvisions.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Key provisions
          </p>
          <ul className="space-y-2">
            {bill.keyProvisions.map((provision) => (
              <li key={provision} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal-500"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM6.8 11.2L3.6 8l1.1-1.1 2.1 2.1 4.4-4.4L12.4 5.7z" />
                </svg>
                {provision}
              </li>
            ))}
          </ul>
        </div>
      )}

      {bill.operatorImpact && (
        <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4">
          <p className="mb-1 text-xs font-semibold tracking-wide text-teal-700 uppercase">
            What this means for operators
          </p>
          <p className="text-sm leading-relaxed text-slate-600">{bill.operatorImpact}</p>
        </div>
      )}
    </div>
  )
}
