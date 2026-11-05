import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      className="rounded-full border-2 border-content px-5 py-2 text-sm font-bold uppercase transition-colors hover:bg-content hover:text-surface"
    >
      {isDark ? t('theme.toLight') : t('theme.toDark')}
    </button>
  )
}
