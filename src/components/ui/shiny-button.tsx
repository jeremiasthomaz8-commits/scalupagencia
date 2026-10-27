import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
type Props =
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
export function ShinyButton({ className, children, ...props }: Props) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </>
  )
  return 'href' in props && props.href ? (
    <Button asChild>
      <a
        className={cn('shiny-button', className)}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    </Button>
  ) : (
    <Button
      className={cn('shiny-button', className)}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </Button>
  )
}
