# Dockerfile en backend
FROM node:22-alpine

WORKDIR /app

# Copiar archivos de dependencias del backend
# Ya estamos en el contexto de backend/ debido a la configuración de Render
COPY package*.json ./

# Verificar el contenido del package.json
RUN cat package.json

# Instalar dependencias (incluidas las de desarrollo para tener nodemon)
RUN npm install

# Copiar el resto de archivos del backend
# Ya estamos en el contexto de backend/ debido a la configuración de Render
COPY . ./

# Listar archivos para verificación
RUN ls -la

EXPOSE 10000

# Establecer variables de entorno
ENV NODE_ENV=production
ENV PORT=10000

# Comando para iniciar la aplicación usando el script start
CMD ["npm", "start"]
