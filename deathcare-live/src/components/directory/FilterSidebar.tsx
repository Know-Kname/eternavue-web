'use client'

import { useQueryStates, parseAsArrayOf, parseAsString, parseAsBoolean } from 'nuqs'
import { US_STATES } from '@/lib/utils'
import type { Facets } from '@/lib/types'

interface FilterSidebarProps {
  facets: Facets
}

export function FilterSidebar({ facets }: FilterSidebarProps) {
  const [filters, setFilters] = useQueryStates(
    {
      state: parseAsString.withDefault(''),
      services: parseAsArrayOf(parseAsString).withDefault([]),
      certs: parseAsArrayOf(parseAsString).withDefault([]),
      featured: parseAsBoolean.withDefault(false),
    },
    { shallow: false }
  )

  const toggleArray = (key: 'services' | 'certs', value: string) => {
    const current = filters[key]
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    setFilters({ [key]: next.length ? next : null })
  }

  const hasActiveFilters =
    filters.state || filters.services.length > 0 || filters.certs.length > 0 || filters.featured

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={() => setFilters({ state: null, services: null, certs: null, featured: null })}
            className="text-sage-600 hover:text-sage-700 text-xs font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* State filter */}
      <div>
        <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
          State
        </label>
        <select
          value={filters.state}
          onChange={(e) => setFilters({ state: e.target.value || null })}
          className="focus:ring-sage-400 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:outline-none"
        >
          <option value="">All states</option>
          {US_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Service type filter */}
      {facets.serviceType.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Services
          </p>
          <div className="space-y-2">
            {facets.serviceType.map((f) => (
              <label key={f.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.services.includes(f.value)}
                  onChange={() => toggleArray('services', f.value)}
                  className="text-sage-400 focus:ring-sage-400 h-4 w-4 rounded border-slate-300"
                />
                <span className="flex-1 text-sm text-slate-700">{f.label}</span>
                <span className="text-xs text-slate-400">{f.count}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Certification filter */}
      {facets.certification.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Certifications
          </p>
          <div className="space-y-2">
            {facets.certification.map((f) => (
              <label key={f.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.certs.includes(f.value)}
                  onChange={() => toggleArray('certs', f.value)}
                  className="text-sage-400 focus:ring-sage-400 h-4 w-4 rounded border-slate-300"
                />
                <span className="flex-1 text-sm text-slate-700">{f.label}</span>
                <span className="text-xs text-slate-400">{f.count}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Featured toggle */}
      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => setFilters({ featured: e.target.checked || null })}
              className="peer sr-only"
            />
            <div className="peer-checked:bg-sage-400 peer-focus:ring-sage-400 h-5 w-9 rounded-full bg-slate-200 transition-colors peer-focus:ring-2 peer-focus:ring-offset-1" />
            <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-sm text-slate-700">Featured only</span>
        </label>
      </div>
    </aside>
  )
}
