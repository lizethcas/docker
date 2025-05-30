# Etapa de construcción
FROM node:22-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
# Ya estamos en el contexto de frontend/ debido a la configuración de Render
COPY package*.json ./

# Limpiar caché de npm para evitar problemas
RUN npm cache clean --force && \
    npm install

# Verificar que el script build existe
RUN grep -q '"build"' package.json || (echo "Error: script 'build' no encontrado en package.json" && exit 1)

# Copiar el resto de archivos
# Ya estamos en el contexto de frontend/ debido a la configuración de Render
COPY . .

# Crear archivo .env durante la construcción
RUN echo "VITE_API_URL=${VITE_API_URL:-http://localhost:10000}" > .env

# Construir la aplicación con manejo de errores
RUN npm run build || (echo "Error en la construcción" && exit 1)

# Verificar que la carpeta dist se creó correctamente
RUN ls -la dist || (echo "Error: carpeta dist no encontrada" && exit 1)

# Etapa de producción
FROM nginx:alpine

# Copiar archivos de la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Crear configuración personalizada de nginx
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
        \
        # Configuración para SPA \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    \
    # Configuración para manejar errores 404 \
    error_page 404 =200 /index.html; \
}' > /etc/nginx/conf.d/default.conf

# Verificar que la configuración de nginx es válida
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
