FROM node:20-slim AS base
RUN corepack enable
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl

#----- DEPENDENCIES -----
FROM base AS install
RUN mkdir -p /tmp
COPY package*.json /tmp
RUN cd /tmp && npm install


FROM base AS release
COPY --from=install /tmp/node_modules ./node_modules
COPY . .
RUN npm run build

EXPOSE ${PORT}
CMD ["bun", "run", "start"]
