# Etapa de construcción
FROM node:22-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Usa un nginx.conf básico o el default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
