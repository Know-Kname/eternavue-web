/**
 * Tally Forms Hook
 *
 * Reusable hook for integrating Tally Forms across all contact forms.
 * Handles form submission, validation, and success/error states.
 *
 * Usage:
 * const { submit, loading, error, success } = useTallyForm('form_id')
 * const handleSubmit = async (e) => {
 *   await submit(formData)
 * }
 */

import { useState, useCallback } from 'react'

interface TallyFormResponse {
  success: boolean
  message: string
}

export function useTallyForm(formId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = useCallback(
    async (data: Record<string, any>) => {
      setLoading(true)
      setError(null)
      setSuccess(false)

      try {
        // Validate form ID
        if (!formId) {
          throw new Error(
            'Form ID not configured. Please check environment variables.'
          )
        }

        // If form ID is a placeholder, use local storage for demo
        if (formId.includes('form_id_here') || formId === 'demo') {
          // Demo mode - store locally
          const submissions = JSON.parse(
            localStorage.getItem('tally_submissions') || '[]'
          )
          submissions.push({
            timestamp: new Date().toISOString(),
            formId,
            data,
          })
          localStorage.setItem(
            'tally_submissions',
            JSON.stringify(submissions)
          )

          setSuccess(true)
          return { success: true, message: 'Form submitted successfully!' }
        }

        // Real Tally Forms submission
        const response = await fetch(
          `https://tally.so/api/forms/${formId}/submissions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: Object.entries(data).map(([key, value]) => ({
                key,
                value,
              })),
            }),
          }
        )

        if (!response.ok) {
          throw new Error(`Tally API error: ${response.statusText}`)
        }

        const result = (await response.json()) as TallyFormResponse
        setSuccess(true)
        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        console.error('Form submission error:', err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [formId]
  )

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
  }, [])

  return { submit, loading, error, success, reset }
}
