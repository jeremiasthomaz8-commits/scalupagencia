import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { Reveal } from '@/components/ui/reveal'
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
        <Reveal className="process-heading">
          <div className="section-heading">
            <h2>{c.title}</h2>
          </div>
          <p>{c.description}</p>
        </Reveal>
        <ol className="process-steps">
          {c.items.map(([title, copy], i) => (
            <li
              className={`process-step ${active === i ? 'active' : ''}`}
              key={i}
              id={`etapa-${i + 1}`}
              data-index={i}
              ref={(el) => {
                steps.current[i] = el
              }}
            >
              <div className="step-top">
                <span>0{i + 1}</span>
                <ArrowDownRight size={22} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
