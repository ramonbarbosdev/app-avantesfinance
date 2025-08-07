FROM node:lts-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala dependências (inclusive serve, se estiver no package.json)
RUN npm ci

# Copia todo o restante da aplicação
COPY . ./

# Builda o projeto Angular
RUN npm run build

# Usa o serve do node_modules
CMD ["npx", "serve", "-s", "dist/app-avantesfinance/browser", "-l", "8080"]