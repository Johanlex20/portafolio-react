import type { Experience } from '@/data/types'

// Del más reciente al más antiguo (coincide con LinkedIn).
// Los clientes finales de cada empleador no se nombran: son confidenciales.
export const experience: Experience[] = [
  { id: 'ginko', organization: 'Ginko Financial Solutions', period: '2026 →' },
  { id: 'megasoft', organization: 'Megasoft', period: '2024 – 2026' },
  { id: 'bluechemical', organization: 'Bluechemical', period: '2023 – 2024' },
]
