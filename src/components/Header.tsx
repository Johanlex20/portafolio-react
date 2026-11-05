import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '@/components/LanguageToggle'
import { ScrollProgress } from '@/components/ScrollProgress'
import { ThemeToggle } from '@/components/ThemeToggle'
import { navItems, sectionIds } from '@/data/nav'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollLock } from '@/hooks/useScrollLock'

export function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useScrollLock(menuOpen)

  // Escape cierra el menú móvil (esperado por quien navega con teclado).
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-surface/80 px-6 py-4 backdrop-blur-md md:px-10">
        <a
          href="#home"
          className="title-display text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          Johan
        </a>

        <nav aria-label={t('nav.label')} className="hidden md:block">
          <ul className="flex gap-8 text-sm font-bold uppercase">
            {navItems.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`transition-opacity hover:opacity-100 ${
                    active === id ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="rounded-full border-2 border-content px-4 py-2 text-sm font-bold uppercase md:hidden"
        >
          {menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        </button>

        <ScrollProgress />
      </header>

      {/* Fuera del <header>: el backdrop-blur del header atraparía a un hijo "fixed". */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-center gap-10 bg-surface px-6 md:hidden"
        >
          <nav aria-label={t('nav.label')}>
            <ul className="flex flex-col gap-4">
              {navItems.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="title-display text-5xl"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  )
}
