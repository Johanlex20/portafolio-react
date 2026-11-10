// Video de presentación (~10 s). Para activarlo, solo copia los archivos a public/videos/
// con estos nombres (un video por idioma y una imagen de portada):
//   public/videos/intro-es.mp4   public/videos/intro-en.mp4   public/videos/intro-poster.webp
// Mientras no existan, el modal muestra un aviso amable en lugar de un reproductor roto.
export const introVideo = {
  src: {
    es: '/videos/intro-es.mp4',
    en: '/videos/intro-en.mp4',
  },
  poster: '/videos/intro-poster.webp',
} as const
