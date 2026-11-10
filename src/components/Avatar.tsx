import { useEffect, useId, useRef, useState } from 'react'
import { preload } from 'react-dom'
import logoBase from '@/assets/logo-base.webp'
import logoEyes from '@/assets/logo-eyes.webp'
import logoMouth from '@/assets/logo-mouth.webp'

type AvatarProps = {
  // Foto definitiva. Si no se pasa, se usa la manito (logo) con expresiones.
  // Cuando haya foto: <Avatar src="..." alt="..." />
  src?: string
  alt?: string
}

// Centros de los ojos sobre el lienzo de la imagen (1024 x 1024).
const LEFT = 468
const RIGHT = 714

// Espiral de Arquímedes centrada en (0, 0): se dibuja una vez y luego gira.
function spiral(turns: number, radius: number) {
  const steps = 170
  const total = turns * 2 * Math.PI
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const r = 4 + (radius - 4) * t
    const x = r * Math.cos(total * t)
    const y = r * Math.sin(total * t)
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

// Cristal de las gafas (el izquierdo; el derecho es el mismo espejado).
const glassLens =
  'M-93 -38 Q-93 -60 -70 -60 L70 -60 Q94 -60 94 -34 Q92 64 0 66 Q-94 64 -93 -38 Z'

const darkSpiral = spiral(2.5, 66)
const blueSpiral = spiral(2.4, 50)

// Las caras cambian en el punto más alto del salto: 0,9 s = mitad de un salto de 1,8 s.
const atApex = { animationDelay: '0.9s' }

const layer = 'absolute inset-0 h-full w-full motion-reduce:animate-none'

export function Avatar({ src, alt = '' }: AvatarProps) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  // El logo aparece (con un fundido) solo cuando sus 3 imágenes ya cargaron, para que nunca se vea a medias.
  // failsafe: si una imagen tarda o falla, a los 2 s se muestra igual.
  const [loaded, setLoaded] = useState(0)
  const [failsafe, setFailsafe] = useState(false)
  const [paused, setPaused] = useState(false)
  const visible = Boolean(src) || loaded >= 3 || failsafe
  const onLoad = () => setLoaded((n) => n + 1)

  if (!src) {
    // Pide las imágenes con prioridad desde el primer render (es lo primero que se ve en la página).
    preload(logoBase, { as: 'image', fetchPriority: 'high' })
    preload(logoEyes, { as: 'image', fetchPriority: 'high' })
    preload(logoMouth, { as: 'image', fetchPriority: 'high' })
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setFailsafe(true), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  // Fuera de pantalla no hay por qué animar: se pausa todo y se ahorra batería.
  useEffect(() => {
    const el = root.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) =>
      setPaused(!entry.isIntersecting),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const ids = {
    soft: `${id}-soft`,
    disc: `${id}-disc`,
    glass: `${id}-glass`,
  }

  return (
    <div
      ref={root}
      data-paused={paused ? '' : undefined}
      className={`relative w-full animate-face transition-opacity duration-500 [animation-delay:0.9s] motion-reduce:animate-none motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* hop-x: desplazamiento lateral e inclinación. hop-y: altura y aplastón. */}
      <div className="animate-hop-x motion-reduce:animate-none">
        <div className="relative aspect-square w-full origin-[50%_88%] animate-hop-y motion-reduce:animate-none">
          {src ? (
            <img src={src} alt={alt} className="h-full w-full" />
          ) : (
            <>
              <img
                src={logoBase}
                alt={alt}
                width={640}
                height={640}
                decoding="async"
                onLoad={onLoad}
                className="h-full w-full"
              />
              {/* Capa 1: boca y lengua (la original). Solo crece hacia abajo. */}
              <img
                src={logoMouth}
                alt=""
                onLoad={onLoad}
                aria-hidden="true"
                style={atApex}
                className={`${layer} origin-[57%_60.5%] animate-mouth`}
              />
              {/* Capa 2: ojos felices (los de la imagen original). */}
              <img
                src={logoEyes}
                alt=""
                onLoad={onLoad}
                aria-hidden="true"
                style={atApex}
                className={`${layer} face-on-0 origin-[50%_54%] animate-eyes`}
              />
              {/* Capa 3: caras dibujadas, mismo estilo de relieve y sombra suave. */}
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                focusable="false"
                className={`${layer} pointer-events-none`}
              >
                <defs>
                  <filter
                    id={ids.soft}
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="4"
                      floodColor="#6a3200"
                      floodOpacity="0.4"
                    />
                  </filter>
                  <radialGradient id={ids.disc} cx="40%" cy="35%" r="75%">
                    <stop offset="0" stopColor="#4cb0ff" />
                    <stop offset="1" stopColor="#1366e6" />
                  </radialGradient>
                  <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#8b6fe3" />
                    <stop offset="0.5" stopColor="#4b3499" />
                    <stop offset="1" stopColor="#241860" />
                  </linearGradient>
                </defs>

                {/* Cara 2: espirales marrones (hipnotizado). */}
                <g className="face-on-1" filter={`url(#${ids.soft})`}>
                  {[LEFT, RIGHT].map((cx, i) => (
                    <g key={cx} transform={`translate(${cx} 528)`}>
                      <g
                        className={`spin-on-1 animate-spin-eye ${i ? '[animation-direction:reverse]' : ''}`}
                        style={{ transformOrigin: '0 0' }}
                      >
                        <path
                          d={darkSpiral}
                          fill="none"
                          stroke="#2b1a14"
                          strokeWidth="18"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d={darkSpiral}
                          transform="translate(-2.5 -3)"
                          fill="none"
                          stroke="#ffd9a0"
                          strokeOpacity="0.32"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                  ))}
                </g>

                {/* Cara 3: gafas de sol redondas con cristales morados y brillo (estilo emoji). */}
                <g className="face-on-2" filter={`url(#${ids.soft})`}>
                  <path
                    d="M556 514 Q591 496 626 514 M382 520 L352 508 M800 520 L830 508"
                    fill="none"
                    stroke="#6a52c4"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  {[LEFT, RIGHT].map((cx) => (
                    <g key={cx} transform={`translate(${cx} 538) scale(0.9)`}>
                      <path
                        d={glassLens}
                        fill={`url(#${ids.glass})`}
                        stroke="#6a52c4"
                        strokeWidth="9"
                        strokeLinejoin="round"
                      />
                      {/* Brillos: estrella y destello suave */}
                      <path
                        d="M-46 -46 L-41 -32 L-27 -27 L-41 -22 L-46 -8 L-51 -22 L-65 -27 L-51 -32 Z"
                        fill="#fff"
                        fillOpacity="0.85"
                      />
                      <ellipse
                        cx="34"
                        cy="-36"
                        rx="38"
                        ry="9"
                        transform="rotate(-14 34 -36)"
                        fill="#fff"
                        fillOpacity="0.16"
                      />
                    </g>
                  ))}
                </g>

                {/* Cara 4: ojos de disco azul con espiral. */}
                <g className="face-on-3" filter={`url(#${ids.soft})`}>
                  {[LEFT, RIGHT].map((cx, i) => (
                    <g key={cx} transform={`translate(${cx} 530)`}>
                      <circle
                        r="66"
                        fill={`url(#${ids.disc})`}
                        stroke="#0a3d9c"
                        strokeWidth="6"
                      />
                      <g
                        className={`spin-on-3 animate-spin-eye ${i ? '[animation-direction:reverse]' : ''}`}
                        style={{ transformOrigin: '0 0' }}
                      >
                        <path
                          d={blueSpiral}
                          transform="translate(2 3)"
                          fill="none"
                          stroke="#0b4fc4"
                          strokeWidth="13"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d={blueSpiral}
                          fill="none"
                          stroke="#7fcbff"
                          strokeWidth="11"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                  ))}
                </g>
              </svg>
            </>
          )}
        </div>
      </div>
      {/* Sombra en el piso: más ancha al aterrizar, chica y tenue en el aire; sigue al salto. */}
      <div
        aria-hidden="true"
        className="absolute bottom-[3%] left-1/2 h-[4%] w-[55%] -translate-x-1/2 animate-hop-shadow rounded-full bg-black blur-md motion-reduce:animate-none"
      />
    </div>
  )
}
