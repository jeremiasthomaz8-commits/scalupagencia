import {
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Target,
  MousePointer2,
  Layers3,
  ChartNoAxesCombined,
  Workflow,
  Compass,
} from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { Reveal } from '@/components/ui/reveal'
import { ShinyButton } from '@/components/ui/shiny-button'
export function ProblemSection() {
  const { t } = useLanguage()
  const c = t.problem
  return (
    <section className="section problem" id="problema">
      <div className="wrap">
        <Reveal className="section-heading centered">
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
        </Reveal>
        <div className="comparison-head" aria-hidden="true">
          <span>{c.left}</span>
          <span>{c.right}</span>
        </div>
        <div className="comparisons">
          {c.rows.map(([title, body, solution, copy], i) => (
            <Reveal className="comparison-row" key={i}>
              <article className="comparison-negative">
                <X size={20} />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
              <article className="comparison-positive">
                <Check size={20} />
                <div>
                  <h3>{solution}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="problem-bottom">
          <p>{c.description}</p>
          <strong>{c.conclusion}</strong>
        </div>
      </div>
    </section>
  )
}
export function SolutionSection() {
  const { t } = useLanguage()
  const c = t.solution
  return (
    <section className="section solution" id="metodologia">
      <div className="wrap">
        <div className="solution-top">
          <div className="section-heading">
            <h2>{c.title}</h2>
          </div>
          <div className="solution-blocks">
            {c.blocks.map(([title, body]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
        <Reveal className="question-panel">
          <img
            className="question-symbol"
            src="/brand/symbol-charcoal.svg"
            alt=""
            width="240"
            height="270"
          />
          <p>{c.lead}</p>
          <h3>{c.question}</h3>
          <ol className="method-flow">
            {c.flow.map((stage, i) => (
              <li key={stage}>
                <span>{stage}</span>
                {i < 4 && <ArrowRight aria-hidden="true" size={16} />}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
const pillarIcons = [Target, MousePointer2, Layers3, ChartNoAxesCombined, Workflow, Compass]
function PillarVisual({ index, tags, label }: { index: number; tags: string[]; label: string }) {
  const Icon = pillarIcons[index]
  return (
    <div className={`pillar-visual visual-${index}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-core">
        <Icon size={38} strokeWidth={1.3} />
      </div>
      <div className="visual-tags">
        {tags.map((tag, i) => (
          <span key={tag} className={`tag-${i}`}>
            {tag}
          </span>
        ))}
      </div>
      <span className="visual-caption">{label}</span>
      {index === 0 && (
        <div className="target-rings">
          <i />
          <i />
          <i />
        </div>
      )}
      {index === 1 && (
        <div className="conversion-page">
          <i />
          <i />
          <i />
          <b>
            <ArrowUpRight size={16} />
          </b>
        </div>
      )}
      {index === 2 && (
        <div className="creative-stack">
          <i />
          <i />
          <i />
        </div>
      )}
      {index === 3 && (
        <div className="data-bars">
          {[35, 55, 42, 72, 60, 90].map((n, i) => (
            <i key={i} style={{ height: `${n}%` }} />
          ))}
        </div>
      )}
    </div>
  )
}
export function ServicesSection() {
  const { t } = useLanguage()
  const c = t.pillars
  return (
    <section className="section services" id="solucoes">
      <div className="wrap">
        <Reveal className="section-heading centered">
          <h2>{c.title}</h2>
          <p>{c.description}</p>
        </Reveal>
        <div className="pillar-grid">
          {c.items.map(([title, body], i) => (
            <article className={`pillar-card pillar-${i}`} key={i} tabIndex={0}>
              <PillarVisual index={i} tags={c.tags[i]} label={c.visuals[i]} />
              <div className="pillar-copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="section-action">
          <ShinyButton href="#diagnostico">{t.ui.cta}</ShinyButton>
        </div>
      </div>
    </section>
  )
}
export function GrowthSystemSection() {
  const { t } = useLanguage()
  const c = t.difference
  return (
    <section className="section growth-system" id="diferencial">
      <div className="wrap">
        <Reveal className="section-heading centered">
          <h2>{c.title}</h2>
          <p>{c.description}</p>
        </Reveal>
        <ol className="system-flow">
          {c.flow.map((label, i) => (
            <li key={label}>
              <span>{label}</span>
              {i < 8 && <ArrowRight aria-hidden="true" size={19} />}
            </li>
          ))}
        </ol>
        <p className="system-conclusion">{c.conclusion}</p>
      </div>
    </section>
  )
}
export function AudienceSection() {
  const { t } = useLanguage()
  const c = t.audience
  return (
    <section className="section audience" id="para-quem">
      <div className="wrap audience-grid">
        <div className="section-heading">
          <h2>{c.title}</h2>
          <p>{c.conclusion}</p>
        </div>
        <div>
          <h3 className="audience-intro">{c.intro}</h3>
          <ul>
            {c.items.map((item) => (
              <li key={item}>
                <span>
                  <Check size={18} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
