import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext, type Language } from './context'
import { pt, en } from './messages'
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem('scalup-language') === 'en' ? 'en' : 'pt'
    } catch {
      return 'pt'
    }
  })
  const t = language === 'pt' ? pt : en
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    const meta = (key: string, value: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let node = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!node) {
        node = document.createElement('meta')
        node.setAttribute(attr, key)
        document.head.append(node)
      }
      node.content = value
    }
    meta('description', t.meta.description)
    meta('robots', 'index,follow')
    meta('og:title', t.meta.title, true)
    meta('og:description', t.meta.description, true)
    meta('og:locale', language === 'pt' ? 'pt_BR' : 'en_US', true)
    meta('og:url', 'https://scalupagencia.com/', true)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = 'https://scalupagencia.com/'
    try {
      localStorage.setItem('scalup-language', language)
    } catch {
      /* Storage is optional. */
    }
  }, [language, t])
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
