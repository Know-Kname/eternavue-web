'use client'

import { useQueryState, parseAsString } from 'nuqs'
import { cn } from '@/lib/utils'
import type { PostKind } from '@/lib/types'

const KINDS: { value: PostKind | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'note', label: 'Field Notes' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'position', label: 'Positions' },
  { value: 'question', label: 'Questions' },
  { value: 'report', label: 'Reports' },
]

export function FeedFilter() {
  const [kind, setKind] = useQueryState('kind', parseAsString.withDefault(''))

  return (
    <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto py-1">
      {KINDS.map((k) => (
        <button
          key={k.value}
          onClick={() => setKind(k.value || null)}
          className={cn(
            'shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
            kind === k.value
              ? 'bg-teal-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
        >
          {k.label}
        </button>
      ))}
    </div>
  )
}
