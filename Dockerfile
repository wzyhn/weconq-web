FROM node:24-alpine AS build
WORKDIR /src
RUN npm install --global pnpm@10.8.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY next.config.mjs next-env.d.ts tsconfig.json ./
COPY src ./src
COPY public ./public
COPY scripts ./scripts
RUN pnpm build && pnpm verify:export
ARG SOURCE_COMMIT
RUN pnpm write:release-manifest "$SOURCE_COMMIT"

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/out /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:8080/.weconq-release.json || exit 1
