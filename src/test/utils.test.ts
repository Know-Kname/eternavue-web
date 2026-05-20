import { describe, it, expect } from 'vitest'
import { cn, slugToLabel, formatDate, formatDistanceToNow } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
  it('drops falsy values', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })
  it('deduplicates conflicting Tailwind classes', () => {
    expect(cn('text-red-500', 'text-teal-500')).toBe('text-teal-500')
  })
})

describe('slugToLabel', () => {
  it('converts single-word slug', () => {
    expect(slugToLabel('jobs')).toBe('Jobs')
  })
  it('converts multi-word slug', () => {
    expect(slugToLabel('funeral-homes')).toBe('Funeral Homes')
  })
})

describe('formatDate', () => {
  it('returns a non-empty string for a valid date', () => {
    expect(formatDate('2024-01-15')).toBeTruthy()
  })
  it('includes the year', () => {
    expect(formatDate('2024-01-15')).toContain('2024')
  })
})

describe('formatDistanceToNow', () => {
  it('returns "ago" string for recent dates', () => {
    const recent = new Date(Date.now() - 1000 * 60 * 5).toISOString()
    expect(formatDistanceToNow(recent)).toMatch(/m ago|h ago|d ago/)
  })
})
