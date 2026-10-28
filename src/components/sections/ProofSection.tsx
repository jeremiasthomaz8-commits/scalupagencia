import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { clients } from '@/content'
import { useLanguage } from '@/i18n/context'
import { Reveal, TextReveal } from '@/components/ui/reveal'
export function ProofSection() {
  const { t, language } = useLanguage()
  const [paused, setPaused] = useState(false)
  return (
    <section id="resultados" className="section proof">
      <div className="wrap">
        <Reveal className="proof-heading" variant="text">
          <TextReveal text={t.proof.title} />
          <img src="/brand/logo-charcoal.svg" alt="Scalup" width="170" height="47" />
        </Reveal>
        <Reveal className="metrics" variant="diagram">
          {t.proof.metrics.map(([number, label]) => (
            <div key={label}>
              <strong>{number}</strong>
              <p>{label}</p>
            </div>
          ))}
        </Reveal>
        <div className="client-showcase">
          <div className="client-showcase-heading">
            <h2>{t.proof.clients}</h2>
            <p>
              {language === 'pt'
                ? 'Marcas que fazem parte da nossa trajetória.'
                : 'Brands that are part of our journey.'}
            </p>
          </div>
          <div className="client-motion-controls">
            <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
              {paused ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
              {paused ? t.ui.play : t.ui.pause}
            </button>
          </div>
          <div className={`client-wall client-marquees${paused ? ' is-paused' : ''}`}>
            {[clients.slice(0, 8), clients.slice(8)].map((row, rowIndex) => (
              <div className="client-marquee-row" key={rowIndex}>
                <div className="client-marquee-track">
                  {[0, 1].map((copy) => (
                    <div
                      className="client-marquee-group"
                      key={copy}
                      aria-hidden={copy === 1 ? true : undefined}
                    >
                      {row.map(([file, name]) => (
                        <div className="client-wall-item" key={file}>
                          <img
                            src={`/assets/clientes/${file}.png`}
                            alt={copy ? '' : name}
                            width="180"
                            height="80"
                            loading="eager"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
