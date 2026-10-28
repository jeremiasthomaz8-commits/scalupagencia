import { BadgeCheck, Users } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { Reveal, TextReveal } from '@/components/ui/reveal'

const platforms = ['Google', 'Meta', 'TikTok', 'LinkedIn']
export function CertificationsSection() {
  const { language } = useLanguage()
  const pt = language === 'pt'
  return (
    <section
      className="section certifications"
      id="certificacoes"
      aria-label={pt ? 'Certificações' : 'Certifications'}
    >
      <div className="wrap">
        <Reveal className="section-heading split-intro" variant="text">
          <TextReveal
            text={
              pt
                ? 'Conhecimento certificado. Estratégia na prática.'
                : 'Certified knowledge. Strategy in practice.'
            }
          />
          <p>
            {pt
              ? 'Certificações em Google, Meta, TikTok e LinkedIn para uma atuação conectada às principais plataformas digitais.'
              : 'Certifications in Google, Meta, TikTok and LinkedIn for work across the leading digital platforms.'}
          </p>
        </Reveal>
        <div className="certification-grid">
          {platforms.map((platform) => (
            <article className="certification-card" key={platform}>
              <BadgeCheck size={28} aria-hidden="true" />
              <h3>{platform}</h3>
              <p>{pt ? 'Certificação' : 'Certification'}</p>
            </article>
          ))}
        </div>
        <div className="community-panel">
          <Users size={38} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h3>Subido Pro</h3>
            <p>
              {pt
                ? 'Participação no Subido Pro, a mentoria do Pedro Sobral que vai além da Comunidade Subido.'
                : 'Participation in Subido Pro, Pedro Sobral’s mentorship program that goes beyond Comunidade Subido.'}
            </p>
          </div>
          <span>
            {pt
              ? 'Onde se reúnem os profissionais mais qualificados do mercado.'
              : 'Where the market’s most qualified professionals come together.'}
          </span>
        </div>
      </div>
    </section>
  )
}
