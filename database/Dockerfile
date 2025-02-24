FROM node:20-slim AS base
RUN corepack enable
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl

#setup .env
ENV DATABASE_PROVIDER='postgresql'
ENV DATABASE_URL='postgresql://root:secret@localhost:5432/keystone'
ENV DATABASE_SHADOW_URL='postgresql://shadow:shadow-secret@localhost:5432/keystone'

RUN npm install -g bun

COPY . .

RUN bun install --no-cache



RUN bun run build

EXPOSE ${PORT}
CMD ["/bin/bash", "./start-on-production.sh"]
