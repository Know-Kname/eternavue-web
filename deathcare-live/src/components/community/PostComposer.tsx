'use client'

import { useState, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { MOCK_BILLS, ACTIVE_STATES, STATE_NAMES } from '@/lib/mock-community'

const IS_CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const POST_KINDS = [
  { value: 'note', label: 'Field note', color: 'text-teal-600 bg-teal-50 border-teal-200', active: 'bg-teal-500 text-white border-teal-500' },
  { value: 'analysis', label: 'Analysis', color: 'text-purple-600 bg-purple-50 border-purple-200', active: 'bg-purple-600 text-white border-purple-600' },
  { value: 'position', label: 'Position', color: 'text-amber-700 bg-amber-50 border-amber-200', active: 'bg-amber-500 text-white border-amber-500' },
  { value: 'question', label: 'Question', color: 'text-sky-600 bg-sky-50 border-sky-200', active: 'bg-sky-500 text-white border-sky-500' },
] as const

type PostKind = typeof POST_KINDS[number]['value']

const MAX_CHARS = 3000

function ComposerForm() {
  const { user } = useUser()
  const [expanded, setExpanded] = useState(false)
  const [kind, setKind] = useState<PostKind>('note')
  const [body, setBody] = useState('')
  const [state, setState] = useState('')
  const [billQuery, setBillQuery] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user?.username ?? 'You'
  const initials = displayName[0].toUpperCase()
  const charsLeft = MAX_CHARS - body.length
  const canSubmit = body.trim().length >= 10

  function handleExpand() {
    setExpanded(true)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  function handleCancel() {
    setExpanded(false)
    setBody('')
    setKind('note')
    setState('')
    setBillQuery('')
    setIsAnonymous(false)
  }

  function handleSubmit() {
    if (!canSubmit) return
    // TODO: POST to /api/posts with Supabase integration
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      handleCancel()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-teal-700">
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">Post shared with the community!</span>
      </div>
    )
  }

  if (!expanded) {
    return (
      <button
        onClick={handleExpand}
        className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left transition-all hover:border-teal-200 hover:shadow-sm"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
          {initials}
        </div>
        <span className="text-sm text-slate-400">
          Share a field note, analysis, or question with the community...
        </span>
      </button>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Kind selector */}
      <div className="flex gap-1.5 border-b border-slate-100 px-4 pt-4 pb-3">
        {POST_KINDS.map((k) => (
          <button
            key={k.value}
            onClick={() => setKind(k.value)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
              kind === k.value ? k.active : k.color
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Author row */}
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800">
              {isAnonymous ? 'Anonymous member' : displayName}
            </p>
            <p className="text-xs text-slate-400">
              {kind.charAt(0).toUpperCase() + kind.slice(1)}
              {state ? ` · ${state}` : ''}
            </p>
          </div>
        </div>

        {/* Body */}
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_CHARS))}
          placeholder={
            kind === 'note'
              ? 'Share a field observation — what are you seeing on the ground?'
              : kind === 'analysis'
                ? 'Break down a bill, trend, or regulatory change for your peers...'
                : kind === 'position'
                  ? 'State your position on a bill or industry issue...'
                  : 'Ask the community something only experienced operators would know...'
          }
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100 focus:outline-none"
        />

        {/* Meta row */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:border-teal-300 focus:outline-none"
          >
            <option value="">State (optional)</option>
            {ACTIVE_STATES.map((code) => (
              <option key={code} value={code}>
                {STATE_NAMES[code]}
              </option>
            ))}
          </select>

          <select
            value={billQuery}
            onChange={(e) => setBillQuery(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:border-teal-300 focus:outline-none"
          >
            <option value="">Link a bill (optional)</option>
            {MOCK_BILLS.filter((b) => !state || b.state === state).map((b) => (
              <option key={b.id} value={b.id}>
                {b.billNumber}: {b.title.slice(0, 40)}…
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-slate-300 accent-teal-500"
            />
            Post anonymously
          </label>

          <div className="flex items-center gap-3">
            <span className={`text-xs ${charsLeft < 100 ? 'text-amber-500' : 'text-slate-400'}`}>
              {charsLeft}
            </span>
            <button
              onClick={handleCancel}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="rounded-lg bg-teal-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignedOutPrompt() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 1112 0H2z" />
          </svg>
        </div>
        <span className="flex-1 text-sm text-slate-400">
          Share a field note, analysis, or question...
        </span>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/login"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Sign in
          </Link>
          <Link
            href="/join"
            className="rounded-lg bg-teal-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Join free
          </Link>
        </div>
      </div>
    </div>
  )
}

function ClerkPostComposer() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
  }

  if (!isSignedIn) return <SignedOutPrompt />

  return <ComposerForm />
}

export function PostComposer() {
  if (IS_CLERK_ENABLED) return <ClerkPostComposer />
  return <SignedOutPrompt />
}
