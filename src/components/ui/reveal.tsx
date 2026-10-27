import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

export function Reveal({
  children,
  className = '',
  variant = 'panel',
}: {
  children: ReactNode
  className?: string
  variant?: 'panel' | 'text' | 'diagram'
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return
    node.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('revealed')
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(node)
    const stopMotion = () => {
      if (media.matches) {
        node.classList.add('revealed')
        observer.disconnect()
      }
    }
    media.addEventListener('change', stopMotion)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', stopMotion)
    }
  }, [])
  return (
    <div ref={ref} className={className} data-motion={variant}>
      {children}
    </div>
  )
}

export function TextReveal({ text, className = '' }: { text: string; className?: string }) {
  return (
    <h2 className={`split-heading ${className}`} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span className="word-mask" aria-hidden="true" key={`${i}-${word}`}>
          <span style={{ '--word-delay': `${Math.min(i, 10) * 35}ms` } as CSSProperties}>
            {word}
          </span>{' '}
        </span>
      ))}
    </h2>
  )
}
