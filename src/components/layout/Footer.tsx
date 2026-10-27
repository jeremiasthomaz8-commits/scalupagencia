import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { externalLinks } from '@/content'
import { useLanguage } from '@/i18n/context'
export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#inicio">
              <img src="/brand/logo-primary.svg" width="195" height="54" alt="ScalUp" />
            </a>
            <p>{t.footer.description}</p>
          </div>
          <div>
            <h3>{t.footer.explore}</h3>
            <a href="#metodologia">{t.nav[1]}</a>
            <a href="#solucoes">{t.nav[2]}</a>
            <a href="https://wa.me/5511918215500">{t.ui.cta}</a>
          </div>
          <div>
            <h3>{t.footer.contact}</h3>
            <a href="mailto:contato@scalupagencia.com">
              contato@scalupagencia.com
              <ArrowUpRight size={14} />
            </a>
            <a href="https://wa.me/5511918215500" target="_blank" rel="noopener noreferrer">
              +55 (11) 91821-5500
              <ArrowUpRight size={14} />
            </a>
            <p>{t.footer.location}</p>
            <div className="social-links">
              {externalLinks.instagram && <a href={externalLinks.instagram}>Instagram</a>}
              {externalLinks.linkedin && <a href={externalLinks.linkedin}>LinkedIn</a>}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Agência Escalup. {t.footer.rights}
          </span>
          <span>CNPJ 60.444.212/0001-90</span>
          {externalLinks.privacy && <a href={externalLinks.privacy}>{t.footer.privacy}</a>}
          <a href="#inicio" aria-label={t.ui.backTop}>
            <ArrowUp size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
