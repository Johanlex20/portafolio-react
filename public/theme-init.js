// Fija el tema ANTES de que cargue React, para evitar el parpadeo de tema equivocado.
// Prioridad: elección guardada > preferencia del sistema > oscuro.
// Es un archivo aparte (y no un <script> incrustado) para poder usar una
// Content-Security-Policy estricta: script-src 'self'.
try {
  var saved = localStorage.getItem('theme')
  var theme =
    saved === 'light' || saved === 'dark'
      ? saved
      : matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
  document.documentElement.dataset.theme = theme
} catch (e) {}
