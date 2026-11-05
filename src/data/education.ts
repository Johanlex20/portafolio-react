import freecodecamp from '@/assets/diplomas/freecodecamp.webp'
import oracleAlura from '@/assets/diplomas/oracle-alura.webp'
import sena from '@/assets/diplomas/sena.webp'
import type { Education } from '@/data/types'

export const education: Education[] = [
  {
    id: 'uniminuto',
    institution: 'UNIMINUTO',
    period: '2024 – 2026',
    status: 'pendingDegree',
  },
  {
    id: 'sena',
    institution: 'SENA',
    period: '2022 - 2024',
    status: 'completed',
    diploma: sena,
  },
  {
    id: 'oracleAlura',
    institution: 'Oracle Next Education · Alura Latam',
    period: '2024',
    status: 'completed',
    diploma: oracleAlura,
  },
  {
    id: 'freeCodeCamp',
    institution: 'freeCodeCamp',
    period: '2023',
    status: 'completed',
    diploma: freecodecamp,
  },
]
