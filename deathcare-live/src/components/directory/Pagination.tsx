import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PageInfo } from '@/lib/types'

interface PaginationProps {
  pageInfo: PageInfo
  basePath: string
  currentParams?: Record<string, string>
}

export function Pagination({ pageInfo, basePath, currentParams = {} }: PaginationProps) {
  const { currentPage = 1, totalPages = 1 } = pageInfo

  if (totalPages <= 1) return null

  function buildHref(page: number) {
    const params = new URLSearchParams({ ...currentParams, page: String(page) })
    return `${basePath}?${params.toString()}`
  }

  const pages: (number | 'ellipsis')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('ellipsis')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis')
    pages.push(totalPages)
  }

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {pageInfo.hasPreviousPage && (
        <Link
          href={buildHref(currentPage - 1)}
          className="p-2 rounded-lg text-slate-500 hover:bg-warm-200 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      )}

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-slate-400">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className={cn(
              'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-sage-400 text-white'
                : 'text-slate-600 hover:bg-warm-200'
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        )
      )}

      {pageInfo.hasNextPage && (
        <Link
          href={buildHref(currentPage + 1)}
          className="p-2 rounded-lg text-slate-500 hover:bg-warm-200 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  )
}
