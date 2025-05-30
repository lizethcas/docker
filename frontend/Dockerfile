# Etapa de construcción
FROM node:22-alpine as build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de archivos
COPY . .

# Crear archivo .env durante la construcción
RUN echo "VITE_API_URL=${VITE_API_URL:-http://localhost:10000}" > .env

# Construir la aplicación
RUN npm run build

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

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
