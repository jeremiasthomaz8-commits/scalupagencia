import { clients } from '@/content'
import { useLanguage } from '@/i18n/context'
import { Reveal, TextReveal } from '@/components/ui/reveal'
export function ProofSection() {
  const { t, language } = useLanguage()
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
          <div className="client-wall">
            {clients.map(([file, name]) => (
              <div className="client-wall-item" key={file}>
                <img
                  src={`/assets/clientes/${file}.png`}
                  alt={name}
                  width="180"
                  height="80"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
