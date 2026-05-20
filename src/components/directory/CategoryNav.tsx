import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ALL_LISTING_TYPES, LISTING_TYPE_MAP } from '@/lib/listing-types'

interface CategoryNavProps {
  activeType?: string
}

const TYPE_ICONS: Record<string, string> = {
  'funeral-homes': '⚰️',
  cremation: '🔥',
  cemeteries: '🌿',
  suppliers: '📦',
  technology: '💻',
  'grief-support': '💙',
}

export function CategoryNav({ activeType }: CategoryNavProps) {
  return (
    <nav
      className="scrollbar-hide flex gap-1.5 overflow-x-auto pb-1"
      aria-label="Directory categories"
    >
      <Link
        href="/directory"
        className={cn(
          'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
          !activeType ? 'bg-sage-400 text-white' : 'bg-warm-100 hover:bg-warm-200 text-slate-600'
        )}
      >
        All Categories
      </Link>
      {ALL_LISTING_TYPES.map((type) => (
        <Link
          key={type}
          href={`/directory/${type}`}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
            activeType === type
              ? 'bg-sage-400 text-white'
              : 'bg-warm-100 hover:bg-warm-200 text-slate-600'
          )}
        >
          <span aria-hidden>{TYPE_ICONS[type]}</span>
          {LISTING_TYPE_MAP[type].plural}
        </Link>
      ))}
    </nav>
  )
}
