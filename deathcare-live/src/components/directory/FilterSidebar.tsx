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
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    setFilters({ [key]: next.length ? next : null })
  }

  const hasActiveFilters =
    filters.state || filters.services.length > 0 || filters.certs.length > 0 || filters.featured

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 text-sm">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={() => setFilters({ state: null, services: null, certs: null, featured: null })}
            className="text-xs text-sage-600 hover:text-sage-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* State filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          State
        </label>
        <select
          value={filters.state}
          onChange={e => setFilters({ state: e.target.value || null })}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          <option value="">All states</option>
          {US_STATES.map(s => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Service type filter */}
      {facets.serviceType.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Services
          </p>
          <div className="space-y-2">
            {facets.serviceType.map(f => (
              <label key={f.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.services.includes(f.value)}
                  onChange={() => toggleArray('services', f.value)}
                  className="w-4 h-4 rounded border-slate-300 text-sage-400 focus:ring-sage-400"
                />
                <span className="text-sm text-slate-700 flex-1">{f.label}</span>
                <span className="text-xs text-slate-400">{f.count}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Certification filter */}
      {facets.certification.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Certifications
          </p>
          <div className="space-y-2">
            {facets.certification.map(f => (
              <label key={f.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.certs.includes(f.value)}
                  onChange={() => toggleArray('certs', f.value)}
                  className="w-4 h-4 rounded border-slate-300 text-sage-400 focus:ring-sage-400"
                />
                <span className="text-sm text-slate-700 flex-1">{f.label}</span>
                <span className="text-xs text-slate-400">{f.count}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Featured toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={e => setFilters({ featured: e.target.checked || null })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-checked:bg-sage-400 rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-sage-400 peer-focus:ring-offset-1" />
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-sm text-slate-700">Featured only</span>
        </label>
      </div>
    </aside>
  )
}
