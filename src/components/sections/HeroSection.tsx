import { ArrowRight, ArrowDown, ScanLine, MousePointer2, Check } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { ShinyButton } from '@/components/ui/shiny-button'
export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="hero" id="inicio">
      <div className="hero-halo" aria-hidden="true" />
      <div className="wrap hero-content">
        <div className="hero-main">
          <div className="hero-copy">
            <h1>
              {t.hero.lines.map((line, i) => (
                <span className={`hero-line line-${i}`} key={i}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <ShinyButton href="#diagnostico">{t.ui.cta}</ShinyButton>
              <a className="secondary-button" href="#metodologia">
                {t.ui.learn}
                <ArrowDown size={16} />
              </a>
            </div>
            <p className="hero-microcopy">{t.hero.note}</p>
          </div>
          <div className="hero-portrait">
            <img
              src="/assets/retrato-scalup.png"
              alt={t.hero.portraitAlt}
              width="1254"
              height="1254"
              fetchPriority="high"
            />
          </div>
        </div>
        <div className="acquisition-flow" role="group" aria-label={t.hero.caption}>
          {t.hero.flow.map((label, i) => (
            <div className={`flow-stage flow-stage-${i}`} key={i}>
              <div className="flow-art" aria-hidden="true">
                {i === 0 ? (
                  <div className="demand-dots">
                    {Array.from({ length: 18 }, (_, n) => (
                      <i key={n} />
                    ))}
                    <MousePointer2 className="demand-cursor" size={24} />
                  </div>
                ) : i === 1 ? (
                  <div className="filter-symbol">
                    <ScanLine size={40} />
                    <div className="filter-beam" />
                  </div>
                ) : (
                  <div className="opportunity-dots">
                    {[0, 1, 2].map((n) => (
                      <span key={n}>
                        <Check size={18} />
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <strong>{label}</strong>
                <span>{t.hero.flowNotes[i]}</span>
              </div>
              {i < 2 && <ArrowRight className="flow-connector" aria-hidden="true" size={22} />}
            </div>
          ))}
        </div>
        <div className="hero-trust">
          <span className="tiny-symbol">
            <img src="/brand/symbol-white.svg" alt="" width="20" height="22" />
          </span>
          <p>{t.hero.trust}</p>
        </div>
      </div>
    </section>
  )
}
