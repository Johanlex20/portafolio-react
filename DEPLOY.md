# Despliegue en `portafolio.faseblu.com`

El sitio se publica como una imagen Docker (Node compila, Nginx sirve) detrás de Cloudflare Tunnel,
igual que tus otros sitios `*.faseblu.com`.

## 1. Primera vez en el servidor

```bash
# 1. Traer el código (ajusta la URL a tu repositorio)
cd ~/proyectos
git clone https://github.com/Johanlex20/portafolio-react.git
cd portafolio-react

# 2. Construir la imagen y levantar el contenedor
docker compose up -d --build

# 3. Comprobar que está sano
docker ps --filter name=portafolio-react     # debe decir (healthy)
curl -I http://localhost:4210        # debe responder 200
```

El contenedor expone el puerto **4210** del servidor. Antes de arrancar, confirma que está libre
(`ss -tlnp | grep 4210`); el portafolio actual usa el 4204. Si necesitas otro, cámbialo en
`docker-compose.yml` (`'PUERTO:80'`).

## 2. Publicar en internet con Cloudflare Tunnel

1. Agrega una regla de entrada (_ingress_) en la configuración de tu túnel, **antes** de la regla final
   `http_status:404`:

   ```yaml
   ingress:
     - hostname: portafolio.faseblu.com
       service: http://localhost:4210
     # ...tus otras reglas...
     - service: http_status:404
   ```

2. Crea el registro DNS que apunta al túnel:

   ```bash
   cloudflared tunnel route dns <nombre-o-id-del-tunel> portafolio.faseblu.com
   ```

3. Reinicia el túnel para que lea la nueva regla (por ejemplo `sudo systemctl restart cloudflared`).

Si administras el túnel desde el panel web de Cloudflare Zero Trust, en lugar de los pasos 1 y 2 crea
un _Public hostname_: `portafolio` + dominio `faseblu.com` → servicio `HTTP` → `localhost:4210`.

## 3. Actualizar después de cambios

```bash
cd ~/proyectos/portafolio-react
git pull
docker compose up -d --build
```

Docker reutiliza las capas en caché: si solo cambió el código, la reconstrucción tarda segundos.
El HTML se sirve con `Cache-Control: no-cache` y los archivos de `/assets/` llevan hash en el nombre,
así que los visitantes ven la versión nueva de inmediato.

## 4. Si algo falla

| Síntoma                        | Qué mirar                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Error 502 / 1033 de Cloudflare | `docker ps` (¿está arriba?) y que el puerto de la regla del túnel coincida con el de `docker-compose.yml`.                                 |
| Página en blanco               | Consola del navegador. Una política CSP estricta bloquea cualquier recurso externo no previsto: si agregas uno, permítelo en `nginx.conf`. |
| Video de YouTube no carga      | Debe estar permitido `https://www.youtube-nocookie.com` en `frame-src` (ya lo está).                                                       |
| Ver registros                  | `docker logs portafolio-react`                                                                                                             |
| Reiniciar                      | `docker compose restart`                                                                                                                   |
| Apagar                         | `docker compose down`                                                                                                                      |

## Qué verifica la imagen (ya probado localmente)

- HTML sin caché, `/assets/` con caché de 1 año e `immutable`, gzip activado.
- Video MP4 con soporte de rangos (se puede adelantar sin descargarlo completo).
- Cualquier ruta desconocida devuelve la app (SPA).
- Cabeceras de seguridad: `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
