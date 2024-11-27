FROM oven/bun:latest AS base

WORKDIR /app

COPY . .

RUN bun i
RUN bun run build

FROM oven/bun:latest



COPY --from=base /app/build .

EXPOSE 3000
CMD ["bun", "run", "start"]
