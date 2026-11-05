import autofacsigo1 from '@/assets/projects/autofacsigo-1.webp'
import autofacsigo2 from '@/assets/projects/autofacsigo-2.webp'
import bookstoreHome from '@/assets/projects/bookstore-home.webp'
import bookstoreBooks from '@/assets/projects/bookstore-libros.webp'
import forogoodHome from '@/assets/projects/forogood-home.webp'
import forogoodTopics from '@/assets/projects/forogood.webp'
import jobboardAdmin from '@/assets/projects/jobboard.webp'
import jobboardOffers from '@/assets/projects/jobboard-ofertas.webp'
import moviestreamHome from '@/assets/projects/moviestream.webp'
import moviestreamSerie from '@/assets/projects/moviestream-serie.webp'
import type { Project } from '@/data/types'

// Para agregar un proyecto: suma un objeto aquí, su id en ProjectId (types.ts)
// y su descripción en es.json y en.json.
export const projects: Project[] = [
  {
    id: 'autofacsigo',
    name: 'AutoFacSigo',
    tech: [
      'Java',
      'Spring Boot',
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'MySQL',
      'Selenium',
      'Docker',
    ],
    images: [autofacsigo1, autofacsigo2],
    links: {
      repo: 'https://github.com/Johanlex20/AutoFacInfra',
      demo: 'https://autofac.faseblu.com',
    },
    video: {
      kind: 'file',
      src: '/videos/autofac.mp4',
      poster: '/videos/autofac-poster.webp',
    },
  },
  {
    id: 'forogood',
    name: 'Foro Good',
    tech: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MySQL'],
    images: [forogoodHome, forogoodTopics],
    links: {
      repo: 'https://github.com/Johanlex20/foro_hub_front_angular',
      demo: 'https://forogood.faseblu.com',
    },
    video: { kind: 'youtube', id: '6IqSJET2Tjc' },
  },
  {
    id: 'bookstore',
    name: 'Libreria Online',
    tech: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PayPal'],
    images: [bookstoreHome, bookstoreBooks],
    links: {
      repo: 'https://github.com/Johanlex20/bookStoreApi-frontend-Angular-prueba-1',
      demo: 'https://bookstore.faseblu.com',
    },
    video: { kind: 'youtube', id: 'HuG3S0_v8eo' },
  },
  {
    id: 'moviestream',
    name: 'Stream Movie',
    tech: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Tailwind CSS'],
    images: [moviestreamHome, moviestreamSerie],
    links: {
      repo: 'https://github.com/Johanlex20/MovieStreamApi-Frontend-Angular-TypeScript',
      demo: 'https://movie.faseblu.com/home',
    },
    video: { kind: 'youtube', id: 'gCccKWmdVP4' },
  },
  {
    id: 'jobboard',
    name: 'Bolsa de Empleo',
    tech: ['PHP', 'JavaScript', 'Sass', 'PostgreSQL'],
    images: [jobboardOffers, jobboardAdmin],
    links: {
      repo: 'https://github.com/Johanlex20/pempresasMVC',
    },
    video: { kind: 'youtube', id: 'ff_4mrdFFp4' },
  },
]
