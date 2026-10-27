import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { Reveal } from '@/components/ui/reveal'
import { ShinyButton } from '@/components/ui/shiny-button'
export function FinalCTASection() {
  const { t } = useLanguage()
  return (
    <section className="section final-cta">
      <div className="wrap">
        <Reveal className="closing-panel" variant="text">
          <div className="closing-copy">
            <h2>
              {t.final.title}
              <span>{t.final.emphasis}</span>
            </h2>
            <div className="closing-action">
              <p>{t.final.description}</p>
              <ShinyButton href="https://wa.me/5511918215500">{t.ui.cta}</ShinyButton>
            </div>
          </div>
          <div className="closing-art" aria-hidden="true">
            <div className="closing-orbit" />
            <img src="/brand/symbol-charcoal.svg" alt="" width="240" height="270" />
            <ArrowUpRight size={58} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
