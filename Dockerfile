# syntax=docker/dockerfile:1

# ---------- Etapa 1: compilar ----------
# Esta etapa tiene Node y todas las dependencias; NO llega a la imagen final.
FROM node:24-alpine AS build
WORKDIR /app

# Primero solo los archivos de dependencias: Docker reutiliza esta capa en caché
# mientras package*.json no cambie, y los builds siguientes son mucho más rápidos.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Etapa 2: servir ----------
# La imagen final solo contiene Nginx y los archivos estáticos de dist/.
FROM nginx:stable-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Docker marca el contenedor como "healthy" si la portada responde.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
