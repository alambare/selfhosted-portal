FROM docker.io/node:22-alpine AS builder

WORKDIR /app

COPY frontend/package.json ./
RUN npm install --frozen-lockfile

COPY frontend/ .
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:alpine

COPY --from=builder /app/dist /usr/share/nginx/html/
COPY docker/nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
