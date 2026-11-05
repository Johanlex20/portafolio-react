// Ids de las secciones que aparecen en el menú, EN EL MISMO ORDEN que en la página.
// Si cambias el orden de las secciones en App.tsx, cámbialo aquí también.
export const navItems = ['projects', 'about', 'skills', 'contact'] as const

export type NavId = (typeof navItems)[number]

// 'home' (el hero) no está en el menú, pero se observa para saber
// cuándo el usuario volvió arriba y ninguna opción debe quedar marcada.
// 'services' y 'education' tampoco están en el menú, pero se observan por la misma razón.
export const sectionIds = [
  'home',
  'projects',
  'services',
  'about',
  'skills',
  'education',
  'contact',
] as const
