import { ArrowDown, ArrowRight, Check, ScanLine, Target } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { ShinyButton } from '@/components/ui/shiny-button'

const flowIcons = [Target, ScanLine, Check]
export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="hero" id="inicio">
      <div className="hero-halo" aria-hidden="true" />
      <div className="wrap hero-content">
        <div className="hero-main">
          <div className="hero-copy">
            <h1 aria-label={t.hero.lines.join(' ')}>
              {t.hero.lines.map((line, i) => (
                <span className={`hero-line line-${i}`} key={i} aria-hidden="true">
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <ShinyButton href="https://wa.me/5511918215500">{t.ui.cta}</ShinyButton>
              <a className="secondary-button" href="#metodologia">
                {t.ui.learn}
                <ArrowDown size={17} />
              </a>
            </div>
            <p className="hero-microcopy">{t.hero.note}</p>
          </div>
          <div className="hero-stage">
            <div className="portrait-backdrop" aria-hidden="true">
              <img src="/brand/symbol-primary.svg" alt="" width="390" height="440" />
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
            <div className="acquisition-flow" role="group" aria-label={t.hero.caption}>
              {t.hero.flow.map((label, i) => {
                const Icon = flowIcons[i]
                return (
                  <div className={`flow-stage flow-stage-${i}`} key={label}>
                    <div className="flow-art" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <div>
                      <strong>{label}</strong>
                      <span>{t.hero.flowNotes[i]}</span>
                    </div>
                    {i < 2 && <ArrowDown className="flow-connector" aria-hidden="true" size={16} />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="hero-trust">
          <div className="trust-logos" aria-hidden="true">
            <img src="/assets/clientes/cvc-franquias.png" alt="" width="86" height="44" />
            <img src="/assets/clientes/nobile.png" alt="" width="86" height="44" />
            <img src="/assets/clientes/othon.png" alt="" width="86" height="44" />
          </div>
          <p>{t.hero.trust}</p>
          <a href="#resultados" aria-label={t.nav[3]}>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
