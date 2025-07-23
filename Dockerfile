FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

CMD ["serve", "-s", "dist/app-avantesfinance/browser", "-l", "8080"]