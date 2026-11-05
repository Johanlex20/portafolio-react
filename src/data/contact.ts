// Datos de contacto: una sola fuente de verdad para la sección y el footer.
// El correo NO está escrito en claro en el código: se guarda en base64 y se decodifica
// solo cuando alguien lo pide (clic). Así no aparece al leer el código fuente ni en el
// HTML inicial. OJO: frena a los robots simples; no es una medida de seguridad.
const encodedEmail = 'am9oYW5sZXgyMEBob3RtYWlsLmNvbQ=='

export function getEmail() {
  return atob(encodedEmail)
}

export const contact = {
  // Número en formato internacional, sin + ni espacios (lo exige wa.me).
  whatsapp: '573102420656',
  location: 'Bogotá, Colombia',
}

export const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/johanlex20/',
  },
  { id: 'github', label: 'GitHub', href: 'https://github.com/Johanlex20' },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@johanlex20',
  },
] as const
