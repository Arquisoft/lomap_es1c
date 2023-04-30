# Imagen base
FROM node:17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

# TOOD: generar versión optimizada

CMD ["npm", "start"]