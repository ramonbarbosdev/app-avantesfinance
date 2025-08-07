# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Serve stage
FROM nginx:alpine
COPY --from=build dist/app-avantesfinance/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]