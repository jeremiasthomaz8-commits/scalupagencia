import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useLanguage } from '@/i18n/context'
const destinations = [
  '#inicio',
  '#metodologia',
  '#solucoes',
  '#resultados',
  '#para-quem',
  'https://wa.me/5511918215500',
]
export function Header() {
  const [open, setOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  return (
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label={t.ui.home}>
        <img src="/brand/logo-primary.svg" width="150" height="41" alt="Scalup" />
      </a>
      <nav className="desktop-nav" aria-label={t.ui.nav}>
        {t.nav.slice(1, 5).map((label, i) => (
          <a key={destinations[i + 1]} href={destinations[i + 1]}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <div className="language-switch" role="group" aria-label={t.ui.language}>
          <button
            lang="pt-BR"
            aria-label="Português"
            aria-pressed={language === 'pt'}
            onClick={() => setLanguage('pt')}
          >
            PT
          </button>
          <span aria-hidden="true">/</span>
          <button
            lang="en"
            aria-label="English"
            aria-pressed={language === 'en'}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>
        <a className="header-cta" href="https://wa.me/5511918215500">
          {t.ui.talk}
          <ArrowUpRight size={17} />
        </a>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="menu-trigger" aria-label={t.ui.menu}>
            <Menu />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="drawer-overlay" />
            <Dialog.Content className="drawer">
              <div className="drawer-top">
                <Dialog.Title>
                  <img src="/brand/logo-primary.svg" width="140" height="39" alt="Scalup" />
                </Dialog.Title>
                <Dialog.Close aria-label={t.ui.close}>
                  <X />
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">{t.ui.navigate}</Dialog.Description>
              <nav aria-label={t.ui.mobileNav}>
                {t.nav.map((label, i) => (
                  <a key={destinations[i]} href={destinations[i]} onClick={() => setOpen(false)}>
                    {label}
                    <ArrowUpRight size={22} />
                  </a>
                ))}
              </nav>
              <p>{t.hero.label}</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
