# Dockerfile en backend
FROM node:22-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluidas las de desarrollo para tener nodemon)
RUN npm install

# Copiar el resto de archivos
COPY . .

# Verificar que el archivo existe
RUN ls -la src/

EXPOSE 10000

# Establecer variables de entorno
ENV NODE_ENV=production
ENV PORT=10000

# Comando para iniciar la aplicación usando el script start
CMD ["npm", "start"]
