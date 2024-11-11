FROM node:20-slim AS base
RUN corepack enable
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
RUN npm install -g bun

#----- DEPENDENCIES -----
FROM base AS install
RUN mkdir -p /tmp
COPY package*.json /tmp
COPY bun.lockb /tmp
RUN cd /tmp && bun install


FROM base AS release
COPY --from=install /tmp/node_modules ./node_modules
COPY . .
RUN bun run build

EXPOSE ${PORT}
CMD ["bun", "run", "start"]
