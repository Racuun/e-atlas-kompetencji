FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile
RUN bun add -D @rollup/rollup-linux-arm64-gnu

COPY . .

RUN bun --bun run build

FROM oven/bun:latest AS deploy

COPY --from=builder /app/build .

EXPOSE 3000/tcp

CMD bun ./index.js;
