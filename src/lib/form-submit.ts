const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

export interface FormSubmitResult {
  success: boolean
  message: string
}

export async function submitForm(data: Record<string, string>): Promise<FormSubmitResult> {
  // If no Web3Forms key configured, fall back to mailto
  if (!WEB3FORMS_KEY) {
    console.warn('WEB3FORMS_KEY not configured. Using mailto fallback.')
    const subject = encodeURIComponent(`Eternavue Inquiry: ${data.formType || 'General'}`)
    const body = encodeURIComponent(
      Object.entries(data)
        .filter(([key]) => key !== 'formType')
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    )
    window.location.href = `mailto:info@eternavue.com?subject=${subject}&body=${body}`
    return { success: true, message: 'Opening email client...' }
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Eternavue ${data.formType || ''} Inquiry from ${data.name}`,
        from_name: data.name,
        ...data,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return { success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' }
    }
    return { success: false, message: result.message || 'Something went wrong. Please try again.' }
  } catch {
    return { success: false, message: 'Network error. Please check your connection and try again.' }
  }
}
