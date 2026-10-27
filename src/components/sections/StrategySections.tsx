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
  Megaphone,
  Monitor,
  ScanLine,
  Database,
  Handshake,
  SlidersHorizontal,
} from 'lucide-react'
import { useLanguage } from '@/i18n/context'
import { Reveal, TextReveal } from '@/components/ui/reveal'
import { ShinyButton } from '@/components/ui/shiny-button'

export function ProblemSection() {
  const { t } = useLanguage()
  const c = t.problem
  return (
    <section className="section problem" id="problema">
      <div className="wrap">
        <Reveal className="section-heading split-intro" variant="text">
          <TextReveal text={c.title} />
          <p>{c.subtitle}</p>
        </Reveal>
        <div className="comparison-table">
          <div className="comparison-head">
            <span>
              <X size={20} aria-hidden="true" />
              {c.left}
            </span>
            <span>
              <img src="/brand/symbol-charcoal.svg" alt="" width="24" height="27" />
              {c.right}
            </span>
          </div>
          <div className="comparisons">
            {c.rows.map(([title, body, solution, copy], i) => (
              <div className="comparison-row" key={i}>
                <article className="comparison-negative">
                  <X size={18} aria-hidden="true" />
                  <div>
                    <span className="comparison-mobile-label">{c.left}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
                <article className="comparison-positive">
                  <Check size={18} aria-hidden="true" />
                  <div>
                    <span className="comparison-mobile-label">{c.right}</span>
                    <h3>{solution}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
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
      <div className="wrap solution-top">
        <Reveal className="section-heading" variant="text">
          <TextReveal text={c.title} />
        </Reveal>
        <div className="solution-blocks">
          {c.blocks.map(([title, body]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
      <Reveal className="question-panel" variant="diagram">
        <div className="wrap question-grid">
          <div className="question-copy">
            <p>{c.lead}</p>
            <h3>{c.question}</h3>
          </div>
          <div className="qualification-model">
            <img
              className="question-symbol"
              src="/brand/symbol-charcoal.svg"
              alt=""
              width="64"
              height="72"
            />
            <ol className="method-flow">
              {c.flow.map((stage, i) => (
                <li key={stage}>
                  <span>{stage}</span>
                  {i < 4 ? (
                    <ArrowRight aria-hidden="true" size={18} />
                  ) : (
                    <Check aria-hidden="true" size={19} />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
const pillarIcons = [Target, MousePointer2, Layers3, ChartNoAxesCombined, Workflow, Compass]
function PillarVisual({ index, tags, label }: { index: number; tags: string[]; label: string }) {
  const Icon = pillarIcons[index]
  return (
    <div className={`pillar-visual visual-${index}`} aria-hidden="true">
      {index === 0 && (
        <div className="demand-map">
          <div className="map-rings">
            <i />
            <i />
            <i />
          </div>
          <div className="map-target">
            <Target size={38} />
          </div>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <span className={`map-dot dot-${n}`} key={n} />
          ))}
          <div className="map-tag">
            {tags[0]}
            <ArrowRight size={16} />
            {tags[1]}
          </div>
        </div>
      )}
      {index === 1 && (
        <div className="page-scene">
          <div className="conversion-page">
            <div className="browser-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="page-headline" />
            <div className="page-headline short" />
            <div className="page-picture" />
            <div className="page-cta">
              {tags[1]}
              <ArrowUpRight size={17} />
            </div>
          </div>
          <div className="visual-cursor">
            <MousePointer2 size={36} fill="currentColor" />
          </div>
        </div>
      )}
      {index === 2 && (
        <div className="creative-stack">
          {tags.map((tag, i) => (
            <div className={`creative-sheet sheet-${i}`} key={tag}>
              <span>{tag}</span>
              <div className="creative-shape" />
              <i />
              <i />
            </div>
          ))}
        </div>
      )}
      {index === 3 && (
        <div className="data-scene">
          <div className="data-header">
            {tags.map((tag, i) => (
              <span key={tag}>
                {i === 0 ? (
                  <ScanLine size={14} />
                ) : i === 1 ? (
                  <Database size={14} />
                ) : (
                  <Compass size={14} />
                )}
                {tag}
              </span>
            ))}
          </div>
          <svg className="data-chart" viewBox="0 0 500 140" fill="none">
            <path
              className="chart-grid"
              d="M0 25H500M0 70H500M0 115H500M60 0V140M160 0V140M260 0V140M360 0V140M460 0V140"
            />
            <path
              className="chart-line secondary"
              d="M5 115L75 95L145 108L215 62L285 80L355 35L425 56L495 15"
            />
            <path
              className="chart-line"
              d="M5 125L75 110L145 95L215 105L285 60L355 70L425 27L495 36"
            />
            {[
              [75, 110],
              [215, 105],
              [355, 70],
              [495, 36],
            ].map(([x, y]) => (
              <circle cx={x} cy={y} r="5" key={x} />
            ))}
          </svg>
          <span className="visual-caption">{label}</span>
        </div>
      )}
      {index === 4 && (
        <div className="workflow-scene">
          <svg viewBox="0 0 500 180" preserveAspectRatio="none">
            <path d="M75 90H180Q200 90 200 65V40Q200 20 220 20H295Q315 20 315 40V65Q315 90 340 90H425M200 90V140Q200 160 225 160H295Q315 160 315 140V90" />
          </svg>
          {tags.map((tag, i) => (
            <div className={`workflow-node node-${i}`} key={tag}>
              {i === 0 ? (
                <Megaphone size={24} />
              ) : i === 1 ? (
                <Workflow size={30} />
              ) : (
                <Handshake size={24} />
              )}
              <span>{tag}</span>
            </div>
          ))}
          <span className="workflow-check">
            <Check size={15} />
          </span>
        </div>
      )}
      {index === 5 && (
        <div className="strategy-scene">
          <div className="strategy-compass">
            <Compass size={74} strokeWidth={1} />
          </div>
          {tags.map((tag, i) => (
            <span className={`strategy-tag strategy-${i}`} key={tag}>
              {tag}
              {i === 2 && <Check size={14} />}
            </span>
          ))}
        </div>
      )}
      <span className="visual-mark">
        <Icon size={17} />
        <span>{label}</span>
      </span>
    </div>
  )
}
export function ServicesSection() {
  const { t } = useLanguage()
  const c = t.pillars
  return (
    <section className="section services" id="solucoes">
      <div className="wrap">
        <Reveal className="section-heading split-intro" variant="text">
          <TextReveal text={c.title} />
          <p>{c.description}</p>
        </Reveal>
        <div className="pillar-grid">
          {c.items.map(([title, body], i) => (
            <article className={`pillar-card pillar-${i}`} key={i}>
              <h3>{title}</h3>
              <PillarVisual index={i} tags={c.tags[i]} label={c.visuals[i]} />
              <p>{body}</p>
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
const systemIcons = [
  Megaphone,
  Target,
  Monitor,
  Layers3,
  ScanLine,
  Database,
  Workflow,
  SlidersHorizontal,
  Handshake,
]
export function GrowthSystemSection() {
  const { t } = useLanguage()
  const c = t.difference
  return (
    <section className="section growth-system" id="diferencial">
      <div className="wrap">
        <Reveal className="section-heading split-intro" variant="text">
          <TextReveal text={c.title} />
          <p>{c.description}</p>
        </Reveal>
        <Reveal className="system-scene" variant="diagram">
          <svg
            className="system-connections"
            viewBox="0 0 1000 420"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="connection-track" d="M165 70H835V210H165V350H835" />
            <path className="connection-signal" d="M165 70H835V210H165V350H835" />
          </svg>
          <ol className="system-flow">
            {c.flow.map((label, i) => {
              const Icon = systemIcons[i]
              return (
                <li key={label} className={`system-node system-node-${i}`}>
                  <div>
                    <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                  {i < 8 && <ArrowRight className="system-arrow" size={18} aria-hidden="true" />}
                </li>
              )
            })}
          </ol>
        </Reveal>
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
        <Reveal className="section-heading" variant="text">
          <TextReveal text={c.title} />
          <p>{c.conclusion}</p>
          <img
            className="audience-symbol"
            src="/brand/symbol-primary.svg"
            alt=""
            width="82"
            height="92"
          />
        </Reveal>
        <div className="audience-list">
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
