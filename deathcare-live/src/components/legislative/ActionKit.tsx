'use client'

import { useState } from 'react'
import type { Bill } from '@/lib/types'

interface ActionKitProps {
  bill: Bill
}

export function ActionKit({ bill }: ActionKitProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const sponsorName = bill.sponsors[0]?.name ?? 'my representative'
  const emailSubject = `Constituent input on ${bill.billNumber}`
  const emailBody = [
    `Dear ${sponsorName},`,
    '',
    `I am a deathcare professional in ${bill.state} writing regarding ${bill.billNumber}, the ${bill.title}.`,
    '',
    '[Share your position on this bill and describe how it would affect your operation.]',
    '',
    'Thank you for your consideration.',
    '',
    'Sincerely,',
    '[Your name]',
    '[Your firm]',
  ].join('\n')
  const mailtoHref = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">
        Action kit
      </h3>

      <div className="space-y-2">
        <a
          href={mailtoHref}
          className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
        >
          <svg
            className="h-4 w-4 shrink-0 text-teal-500"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 4h12v8H2zM2 4l6 4 6-4" />
          </svg>
          Email the sponsor
        </a>

        {bill.committee && (
          <a
            href={bill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
          >
            <svg
              className="h-4 w-4 shrink-0 text-teal-500"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 1v6M8 7L4 4M8 7l4-3M2 9v5h12V9" />
            </svg>
            Contact the {bill.committee}
          </a>
        )}

        <button
          type="button"
          onClick={() =>
            handleCopy(`${bill.billNumber}: ${bill.plainSummary ?? bill.description}`, 'summary')
          }
          className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
        >
          <svg
            className="h-4 w-4 shrink-0 text-teal-500"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 5V2h9v9h-3M2 5h9v9H2z" />
          </svg>
          {copied === 'summary' ? 'Summary copied' : 'Copy plain-English summary'}
        </button>

        <button
          type="button"
          onClick={() => handleCopy(window.location.href, 'link')}
          className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
        >
          <svg
            className="h-4 w-4 shrink-0 text-teal-500"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 10a3 3 0 004 0l2-2a3 3 0 00-4-4M10 6a3 3 0 00-4 0L4 8a3 3 0 004 4" />
          </svg>
          {copied === 'link' ? 'Link copied' : 'Copy link to this bill'}
        </button>
      </div>
    </div>
  )
}
