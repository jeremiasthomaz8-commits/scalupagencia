export interface Lead {
  faturamento: string
  invest: string
  dor: string
  nome: string
  whats: string
  email: string
  site: string
  website_hp: string
  consent: boolean
}
// Public receiver verified in scalupagencia.com on 2026-10-26. No secret is embedded.
// An explicit empty environment variable disables delivery (including local tests).
const originalReceiver =
  'https://script.google.com/macros/s/AKfycbzqRZHgrlX7r_ztIOrBmPTPYwfPoKV8KIXnst802RJaIgZX73fK-dReSbO1zQYp0kGR/exec'
export const leadEndpoint = import.meta.env.VITE_LEAD_ENDPOINT ?? originalReceiver
export class LeadSubmissionError extends Error {
  constructor(public code: 'spam' | 'unavailable' | 'rejected') {
    super(code)
    this.name = 'LeadSubmissionError'
  }
}
export async function submitLead(lead: Lead): Promise<void> {
  if (lead.website_hp) throw new LeadSubmissionError('spam')
  if (!leadEndpoint) throw new LeadSubmissionError('unavailable')
  if (!lead.consent) throw new LeadSubmissionError('rejected')
  const body = new URLSearchParams({
    ...lead,
    nome: lead.nome.trim(),
    email: lead.email.trim(),
    site: lead.site.trim(),
    consent: lead.consent ? 'on' : '',
    origem: window.location.hostname,
  })
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 20000)
  try {
    const response = await fetch(leadEndpoint, { method: 'POST', body, signal: controller.signal })
    if (!response.ok) throw new Error('HTTP failure')
    const result: unknown = await response.json()
    if (typeof result !== 'object' || result === null || !('ok' in result) || result.ok !== true)
      throw new Error('Receipt not confirmed')
  } catch {
    throw new LeadSubmissionError('rejected')
  } finally {
    window.clearTimeout(timeout)
  }
}
