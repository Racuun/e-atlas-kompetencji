FROM node:20-slim AS base
RUN corepack enable
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
RUN npm install -g bun

COPY . .

RUN bun install --no-cache

RUN bun run build

EXPOSE ${PORT}
CMD ["bun", "run", "start"]
