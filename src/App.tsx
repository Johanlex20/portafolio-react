import { useTranslation } from 'react-i18next'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useScrollTriggerRefresh } from '@/hooks/useScrollTriggerRefresh'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SmoothScroll } from '@/components/SmoothScroll'
import { TechMarquee } from '@/components/TechMarquee'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Services } from '@/sections/Services'
import { Skills } from '@/sections/Skills'

function App() {
  const { t } = useTranslation()

  useScrollTriggerRefresh()
  useDocumentMeta()

  return (
    <>
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-content focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-surface"
      >
        {t('skipToContent')}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TechMarquee />
        <Projects />
        <Services />
        <About />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
