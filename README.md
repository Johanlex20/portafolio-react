# Portafolio · Johan Rodríguez

Sitio personal bilingüe (español / inglés) con tema oscuro y claro, scroll suave y animaciones.
Está pensado como proyecto de práctica de **React moderno**.

🌐 https://portafolio.faseblu.com
📦 https://github.com/Johanlex20/portafolio-react

## Stack

| Para qué                             | Tecnología                                   |
| ------------------------------------ | -------------------------------------------- |
| Interfaz                             | React 19 + TypeScript                        |
| Empaquetado y servidor de desarrollo | Vite                                         |
| Estilos                              | Tailwind CSS 4 (tokens con `@theme`)         |
| Animaciones de scroll                | GSAP + ScrollTrigger (`@gsap/react`) y Lenis |
| Idiomas                              | i18next + react-i18next (claves tipadas)     |
| Pruebas                              | Vitest + Testing Library                     |
| Calidad                              | ESLint + Prettier                            |
| Despliegue                           | Docker (Node → Nginx) + Cloudflare Tunnel    |

## Cómo ejecutarlo

Requiere Node 24 o superior.

```bash
npm install
npm run dev          # servidor de desarrollo en http://localhost:5173
```

| Comando                     | Qué hace                                                   |
| --------------------------- | ---------------------------------------------------------- |
| `npm run dev`               | Servidor de desarrollo con recarga en vivo.                |
| `npm run build`             | Revisa tipos y genera la versión de producción en `dist/`. |
| `npm run preview`           | Sirve `dist/` para probar la versión de producción.        |
| `npm run lint`              | Busca errores y malas prácticas (ESLint).                  |
| `npm run format`            | Da formato a todo el código (Prettier).                    |
| `npm run test` / `test:run` | Pruebas en modo vigilancia / una sola vez.                 |

## Estructura

```
src/
├── components/   Piezas reutilizables (Header, Footer, Modal, botones...)
├── sections/     Secciones de la página (Hero, About, Services, Projects...)
├── data/         Datos que NO cambian con el idioma (proyectos, habilidades, contacto)
├── i18n/         Configuración de idiomas y textos (locales/es.json, en.json)
├── context/      Contexto del tema oscuro/claro
├── hooks/        Hooks propios (useTheme, useReveal, useActiveSection...)
├── lib/          Utilidades de GSAP y Lenis
└── test/         Configuración de las pruebas
```

## Tareas frecuentes

**Agregar un proyecto**

1. Copia sus capturas a `src/assets/projects/`.
2. Agrega su `id` en `ProjectId` (`src/data/types.ts`).
3. Agrega el objeto en `src/data/projects.ts`.
4. Escribe su descripción en `src/i18n/locales/es.json` y `en.json` (`projects.<id>.description`).

Si olvidas alguno de los pasos, TypeScript o `npm run test:run` te lo avisan.

**Cambiar colores, fuentes o el ancho de los titulares:** todo está en `src/index.css`
(`@theme` para la paleta y las fuentes, `@utility title-display` para el estilo de titular).

**Poner el avatar:** guarda la imagen recortada (PNG/WebP con fondo transparente) en
`src/assets/` y pásala al componente en `src/sections/Hero.tsx`: `<Avatar src={...} alt="..." />`.

## Decisiones de diseño que conviene recordar

- **Tema:** variables CSS (`--surface`, `--content`, `--muted`) que se redefinen según `data-theme`.
  Una sección puede invertir el tema solo en su interior (`<Section inverted>`).
- **Animación vs. CSS:** no pongas una `transition` de CSS sobre una propiedad que GSAP anima en el
  mismo elemento; pelean entre sí.
- **Accesibilidad:** se respeta `prefers-reduced-motion`; hay enlace "saltar al contenido", foco
  visible y modales con `<dialog>` nativo. Auditado con axe-core (0 violaciones).
- **Seguridad:** Content-Security-Policy estricta en Nginx; el script del tema es un archivo propio
  (`public/theme-init.js`) para no necesitar `unsafe-inline`.

## Despliegue

Ver [DEPLOY.md](DEPLOY.md).
