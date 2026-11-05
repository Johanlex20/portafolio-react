import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Los plugins de GSAP se registran UNA sola vez, aquí.
// El resto del proyecto importa desde '@/lib/gsap', nunca desde 'gsap' directo.
gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
