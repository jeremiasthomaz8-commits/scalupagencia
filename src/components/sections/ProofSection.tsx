import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { clients } from '@/content'
import { useLanguage } from '@/i18n/context'
import { Reveal, TextReveal } from '@/components/ui/reveal'
export function ProofSection() {
  const [paused, setPaused] = useState(false)
  const { t } = useLanguage()
  return (
    <section id="resultados" className="section proof">
      <div className="wrap">
        <Reveal className="proof-heading" variant="text">
          <TextReveal text={t.proof.title} />
          <img src="/brand/logo-charcoal.svg" alt="ScalUp" width="170" height="47" />
        </Reveal>
        <Reveal className="metrics" variant="diagram">
          {t.proof.metrics.map(([number, label]) => (
            <div key={label}>
              <strong>{number}</strong>
              <p>{label}</p>
            </div>
          ))}
        </Reveal>
        <div className="client-intro">
          <h3>{t.proof.clients}</h3>
          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? t.ui.play : t.ui.pause}
            aria-pressed={paused}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
        <div className={`marquee ${paused ? 'paused' : ''}`}>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="logo-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {clients.map(([file, name]) => (
                  <div className="client-logo" key={file}>
                    <img
                      src={`/assets/clientes/${file}.png`}
                      alt={copy ? '' : name}
                      width="150"
                      height="70"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
