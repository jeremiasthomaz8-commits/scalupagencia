import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProofSection } from '@/components/sections/ProofSection'
import {
  ProblemSection,
  SolutionSection,
  ServicesSection,
  GrowthSystemSection,
  AudienceSection,
} from '@/components/sections/StrategySections'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import { useLanguage } from '@/i18n/context'
function Page() {
  const { t } = useLanguage()
  return (
    <>
      <a href="#conteudo" className="skip-link">
        {t.ui.skip}
      </a>
      <Header />
      <main id="conteudo">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <ProcessSection />
        <ProofSection />
        <GrowthSystemSection />
        <AudienceSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  )
}
