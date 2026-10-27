import { useRef, useState, type FormEvent } from 'react'
import { ArrowLeft, Check, ArrowUpRight, LockKeyhole } from 'lucide-react'
import { ShinyButton } from '@/components/ui/shiny-button'
import { externalLinks, formOptions } from '@/content'
import { useLanguage } from '@/i18n/context'
import { submitLead, leadEndpoint, type Lead, LeadSubmissionError } from '@/lib/submit-lead'
type Field = Exclude<keyof Lead, 'consent' | 'website_hp'>
type ErrorCode = 'select' | 'required' | 'phone' | 'email' | 'consent'
const stepFields: Field[][] = [
  ['faturamento', 'invest', 'dor'],
  ['nome', 'whats', 'email'],
  ['site'],
]
const empty: Lead = {
  faturamento: '',
  invest: '',
  dor: '',
  nome: '',
  whats: '',
  email: '',
  site: '',
  website_hp: '',
  consent: false,
}
export function DiagnosticFormSection() {
  const { t } = useLanguage()
  const c = t.form
  const [step, setStep] = useState(0),
    [values, setValues] = useState<Lead>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Lead, ErrorCode>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorCode, setErrorCode] = useState<'unavailable' | 'rejected' | 'spam'>('rejected')
  const busy = useRef(false),
    form = useRef<HTMLFormElement>(null),
    title = useRef<HTMLHeadingElement>(null)
  function update<K extends keyof Lead>(key: K, value: Lead[K]) {
    setValues((old) => ({ ...old, [key]: value }))
    setErrors((old) => ({ ...old, [key]: undefined }))
  }
  function navigate(next: number) {
    setStep(next)
    setErrors({})
    setStatus('idle')
    requestAnimationFrame(() => title.current?.focus({ preventScroll: true }))
  }
  function validate() {
    const next: Partial<Record<keyof Lead, ErrorCode>> = {}
    stepFields[step].forEach((key) => {
      if (!values[key].trim()) next[key] = key in formOptions ? 'select' : 'required'
    })
    if (step === 1) {
      let phone = values.whats.replace(/\D/g, '')
      if (phone.startsWith('55') && phone.length > 11) phone = phone.slice(2)
      if (!/^[1-9]{2}(?:9\d{8}|[2-5]\d{7})$/.test(phone)) next.whats = 'phone'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'email'
    }
    if (step === 2 && !values.consent) next.consent = 'consent'
    setErrors(next)
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      )
      return false
    }
    return true
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (busy.current || !validate()) return
    if (step < 2) {
      navigate(step + 1)
      return
    }
    busy.current = true
    setStatus('sending')
    try {
      await submitLead(values)
      setStatus('success')
      requestAnimationFrame(() => title.current?.focus())
    } catch (error) {
      setStatus('error')
      setErrorCode(error instanceof LeadSubmissionError ? error.code : 'rejected')
    } finally {
      busy.current = false
    }
  }
  function displayValue(key: Field) {
    if (key in formOptions) {
      const field = key as keyof typeof formOptions
      return c.options[field][formOptions[field].indexOf(values[key])] || values[key]
    }
    return values[key]
  }
  return (
    <section className="section diagnostic" id="diagnostico">
      <div className="wrap diagnostic-grid">
        <div className="diagnostic-intro">
          <h2>{c.title}</h2>
          <p>{c.description}</p>
          <div className="diagnostic-note">
            <img src="/brand/symbol-white.svg" width="56" height="62" alt="" />
            <span>{c.note}</span>
          </div>
          <a
            href="https://wa.me/5511918215500"
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.whatsapp}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="form-shell">
          {status === 'success' ? (
            <div className="form-success" role="status">
              <span>
                <Check size={34} />
              </span>
              <h3 ref={title} tabIndex={-1}>
                {c.success}
              </h3>
              <p>{c.successNote}</p>
            </div>
          ) : (
            <>
              <div className="form-progress-meta">
                <span>{c.diagnosis}</span>
                <span>0{step + 1} / 03</span>
              </div>
              <div
                className="form-progress"
                role="progressbar"
                aria-label={c.progress}
                aria-valuenow={step + 1}
                aria-valuemin={1}
                aria-valuemax={3}
              >
                <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
              </div>
              <div className="step-labels">
                {c.steps.map((label, i) => (
                  <span
                    key={i}
                    className={i === step ? 'active' : i < step ? 'complete' : ''}
                    aria-current={i === step ? 'step' : undefined}
                  >
                    <span className="step-number">{i < step ? <Check size={14} /> : i + 1}</span>
                    <span>{label}</span>
                  </span>
                ))}
              </div>
              {!leadEndpoint && (
                <p className="form-availability">
                  {c.unavailable}{' '}
                  <a href="https://wa.me/5511918215500" target="_blank" rel="noopener noreferrer">
                    {c.whatsapp}
                  </a>
                </p>
              )}
              <form ref={form} onSubmit={handleSubmit} noValidate aria-busy={status === 'sending'}>
                <div className="honeypot" aria-hidden="true">
                  <label>
                    {c.honeypot}
                    <input
                      name="website_hp"
                      value={values.website_hp}
                      onChange={(e) => update('website_hp', e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>
                <fieldset key={step} disabled={status === 'sending'} className="form-fields">
                  <legend className="sr-only">{c.steps[step]}</legend>
                  <h3 ref={title} tabIndex={-1}>
                    {c.headings[step]}
                  </h3>
                  {stepFields[step].map((key) => (
                    <div className="field" key={key}>
                      <label htmlFor={key}>{c.fields[key]}</label>
                      {key in formOptions ? (
                        <select
                          id={key}
                          name={key}
                          value={values[key]}
                          onChange={(e) => update(key, e.target.value)}
                          aria-invalid={!!errors[key]}
                          aria-describedby={errors[key] ? `${key}-error` : undefined}
                          required
                        >
                          <option value="">{c.select}</option>
                          {formOptions[key as keyof typeof formOptions].map((option, i) => (
                            <option key={option} value={option}>
                              {c.options[key as keyof typeof formOptions][i]}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={key}
                          name={key}
                          value={values[key]}
                          onChange={(e) => update(key, e.target.value)}
                          type={key === 'email' ? 'email' : key === 'whats' ? 'tel' : 'text'}
                          autoComplete={
                            key === 'nome'
                              ? 'name'
                              : key === 'email'
                                ? 'email'
                                : key === 'whats'
                                  ? 'tel'
                                  : 'url'
                          }
                          maxLength={key === 'site' ? 300 : 150}
                          placeholder={c.placeholders[key as keyof typeof c.placeholders]}
                          aria-invalid={!!errors[key]}
                          aria-describedby={errors[key] ? `${key}-error` : undefined}
                          required
                        />
                      )}
                      {errors[key] && (
                        <span className="field-error" id={`${key}-error`}>
                          {c.errors[errors[key]]}
                        </span>
                      )}
                    </div>
                  ))}
                  {step === 2 && (
                    <>
                      <div className="summary-heading">
                        <span>{c.review}</span>
                        <button type="button" onClick={() => navigate(0)}>
                          {c.edit}
                        </button>
                      </div>
                      <dl className="form-summary">
                        {(
                          ['faturamento', 'invest', 'dor', 'nome', 'whats', 'email'] as Field[]
                        ).map((key) => (
                          <div key={key}>
                            <dt>{c.fields[key]}</dt>
                            <dd>{displayValue(key)}</dd>
                          </div>
                        ))}
                      </dl>
                      <label className="consent">
                        <input
                          type="checkbox"
                          checked={values.consent}
                          onChange={(e) => update('consent', e.target.checked)}
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? 'consent-error' : undefined}
                        />
                        <span>
                          {c.consent}
                          {externalLinks.privacy && (
                            <>
                              {' '}
                              <a href={externalLinks.privacy}>{t.footer.privacy}</a>.
                            </>
                          )}
                        </span>
                      </label>
                      {errors.consent && (
                        <span className="field-error" id="consent-error">
                          {c.errors.consent}
                        </span>
                      )}
                    </>
                  )}
                </fieldset>
                {status === 'error' && (
                  <p role="alert" className="submission-error">
                    {c.errors[errorCode]}{' '}
                    <a href="https://wa.me/5511918215500" target="_blank" rel="noopener noreferrer">
                      {c.openWhats}
                    </a>
                  </p>
                )}
                <div className="form-actions">
                  {step > 0 && (
                    <button
                      type="button"
                      className="back-button"
                      onClick={() => navigate(step - 1)}
                      disabled={status === 'sending'}
                    >
                      <ArrowLeft size={16} />
                      {c.back}
                    </button>
                  )}
                  <ShinyButton type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? c.sending : step === 2 ? c.submit : c.next}
                  </ShinyButton>
                </div>
                <p className="form-footnote">
                  <LockKeyhole size={12} />
                  {c.footnote}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
