import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { Reveal, TextReveal } from '@/components/ui/reveal'
export function ProcessSection() {
  const { t } = useLanguage()
  const c = t.process
  const [active, setActive] = useState(0)
  const steps = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-20% 0px -35% 0px', threshold: 0.2 },
    )
    steps.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <section className="section process" id="metodo">
      <div className="wrap">
        <Reveal className="process-heading" variant="text">
          <div className="section-heading">
            <TextReveal text={c.title} />
          </div>
          <p>{c.description}</p>
        </Reveal>
        <ol className="process-steps">
          {c.items.map(([title, copy], i) => (
            <li
              className={`process-step ${active === i ? 'active' : ''} ${active >= i ? 'passed' : ''}`}
              key={i}
              id={`etapa-${i + 1}`}
              data-index={i}
              ref={(el) => {
                steps.current[i] = el
              }}
            >
              <div className="step-top">
                <span>0{i + 1}</span>
                <div className="step-meter" aria-hidden="true">
                  {[0, 1, 2, 3].map((n) => (
                    <i className={n <= i ? 'lit' : ''} key={n} />
                  ))}
                </div>
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              {i < 3 && (
                <span className="step-connector">
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
