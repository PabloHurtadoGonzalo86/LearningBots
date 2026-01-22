FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api ./apps/api
RUN pnpm install --frozen-lockfile --filter @learning-bots/api
RUN pnpm --filter @learning-bots/api build

FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/package.json ./package.json
COPY pnpm-lock.yaml ./
RUN pnpm install --prod --ignore-scripts

USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
