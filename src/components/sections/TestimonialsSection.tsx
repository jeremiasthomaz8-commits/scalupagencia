import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { Reveal, TextReveal } from '@/components/ui/reveal'

const testimonials = [
  {
    name: 'Mariana Oliveira',
    role: ['Clínica de Estética', 'Aesthetic Clinic'],
    quote: [
      'Antes de contratar a Scalup, já tínhamos investido em anúncios, mas sentíamos falta de uma estratégia mais clara. O trabalho trouxe mais organização para as campanhas e conseguimos entender melhor o que estava funcionando e onde precisávamos melhorar.',
      'Before hiring Scalup, we had already invested in advertising, but felt we needed a clearer strategy. Their work brought more structure to our campaigns and helped us better understand what was working and where we needed to improve.',
    ],
  },
  {
    name: 'Rafael Martins',
    role: ['Empresário', 'Business Owner'],
    quote: [
      'Gostei principalmente da transparência no trabalho. Não é só colocar dinheiro nos anúncios e esperar o resultado. Existe uma preocupação em entender o negócio, analisar os números e buscar melhorias constantemente.',
      'What I appreciated most was the transparency. It is not just about putting money into ads and waiting for results. They care about understanding the business, analyzing the numbers and constantly looking for improvements.',
    ],
  },
  {
    name: 'Camila Ferreira',
    role: ['Empreendedora', 'Entrepreneur'],
    quote: [
      'Precisávamos atrair mais clientes e melhorar nossa presença digital. A Scalup nos ajudou a estruturar melhor as campanhas e a enxergar o marketing de uma forma mais estratégica, pensando não apenas em cliques, mas em oportunidades de negócio.',
      'We needed to attract more customers and improve our digital presence. Scalup helped us structure our campaigns better and see marketing more strategically, thinking not just about clicks, but about business opportunities.',
    ],
  },
  {
    name: 'Felipe Rodrigues',
    role: ['Prestador de Serviços', 'Service Provider'],
    quote: [
      'Um dos pontos positivos foi ter mais clareza sobre onde estava sendo investido nosso dinheiro. Conseguimos acompanhar melhor as campanhas e entender quais ajustes poderiam contribuir para melhorar os resultados.',
      'One of the positives was having more clarity about where our money was being invested. We were able to follow the campaigns more closely and understand which adjustments could help improve results.',
    ],
  },
  {
    name: 'Juliana Costa',
    role: ['Proprietária de Loja', 'Store Owner'],
    quote: [
      'Buscávamos alguém que realmente acompanhasse as campanhas e não simplesmente deixasse tudo rodando. Tivemos mais proximidade no atendimento, análises frequentes e sugestões de melhorias alinhadas aos objetivos da empresa.',
      'We were looking for someone who would actually follow our campaigns rather than just leave everything running. We received more personal service, frequent analysis and suggestions for improvements aligned with our company’s goals.',
    ],
  },
]

export function TestimonialsSection() {
  const { language } = useLanguage()
  const index = language === 'pt' ? 0 : 1
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const goTo = (slide: number) => {
    const element = track.current
    if (!element) return
    const target = Math.max(0, Math.min(testimonials.length - 1, slide))
    element.scrollTo({
      left: target * (element.clientWidth + 20),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }
  return (
    <section
      className="section testimonials"
      id="depoimentos"
      aria-label={index === 0 ? 'Depoimentos' : 'Testimonials'}
    >
      <div className="wrap">
        <Reveal className="section-heading split-intro" variant="text">
          <TextReveal
            text={
              index === 0
                ? 'Quem trabalha com a Scalup conta.'
                : 'Hear from those who work with Scalup.'
            }
          />
          <p>
            {index === 0
              ? 'Experiências de quem buscou mais clareza, estratégia e proximidade no marketing.'
              : 'Experiences from those seeking more clarity, strategy and personal support in marketing.'}
          </p>
        </Reveal>
        <div
          className="testimonial-carousel"
          id="testimonial-slides"
          ref={track}
          role="region"
          aria-label={index === 0 ? 'Carrossel de depoimentos' : 'Testimonial carousel'}
          tabIndex={0}
          onScroll={(event) =>
            setActive(
              Math.max(
                0,
                Math.min(
                  testimonials.length - 1,
                  Math.round(
                    event.currentTarget.scrollLeft / (event.currentTarget.clientWidth + 20),
                  ),
                ),
              ),
            )
          }
          onKeyDown={(event) => {
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
              event.preventDefault()
              goTo(
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? testimonials.length - 1
                    : active + (event.key === 'ArrowRight' ? 1 : -1),
              )
            }
          }}
        >
          {testimonials.map((item, position) => (
            <figure
              className="testimonial-card"
              key={item.name}
              role="group"
              aria-label={`${position + 1} / ${testimonials.length}`}
            >
              <Quote size={30} strokeWidth={1.5} aria-hidden="true" />
              <blockquote>
                <p>“{item.quote[index]}”</p>
              </blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role[index]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="testimonial-controls">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-controls="testimonial-slides"
            aria-label={index === 0 ? 'Depoimento anterior' : 'Previous testimonial'}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="testimonial-dots">
            {testimonials.map((item, position) => (
              <button
                key={item.name}
                type="button"
                aria-label={`${index === 0 ? 'Ver depoimento de' : 'View testimonial from'} ${item.name}`}
                aria-pressed={active === position}
                aria-controls="testimonial-slides"
                onClick={() => goTo(position)}
              >
                <span />
              </button>
            ))}
          </div>
          <span className="sr-only" aria-live="polite">
            {active + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === testimonials.length - 1}
            aria-controls="testimonial-slides"
            aria-label={index === 0 ? 'Próximo depoimento' : 'Next testimonial'}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
