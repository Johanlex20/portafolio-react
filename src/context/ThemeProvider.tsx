import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from '@/context/theme-context'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Modo privado o almacenamiento bloqueado: el tema sigue funcionando.
    }
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
