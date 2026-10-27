import { createContext, useContext } from 'react'
import { pt, type Messages } from './messages'
export type Language = 'pt' | 'en'
export const LanguageContext = createContext<{
  language: Language
  setLanguage: (value: Language) => void
  t: Messages
}>({ language: 'pt', setLanguage: () => {}, t: pt })
export const useLanguage = () => useContext(LanguageContext)
