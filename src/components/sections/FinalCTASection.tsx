import { useLanguage } from '@/i18n/context'
import { Reveal } from '@/components/ui/reveal'
import { ShinyButton } from '@/components/ui/shiny-button'
export function FinalCTASection() {
  const { t } = useLanguage()
  return (
    <section className="section final-cta">
      <div className="wrap">
        <Reveal>
          <img src="/brand/symbol-charcoal.svg" alt="" width="64" height="72" />
          <h2>
            {t.final.title}
            <span>{t.final.emphasis}</span>
          </h2>
          <p>{t.final.description}</p>
          <ShinyButton href="#diagnostico">{t.ui.cta}</ShinyButton>
        </Reveal>
      </div>
    </section>
  )
}
