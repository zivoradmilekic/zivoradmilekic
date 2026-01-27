FROM node:20-alpine AS base
WORKDIR /app

# Enable corepack for yarn management if needed, though yarn 1.x is usually built-in
# RUN corepack enable

FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runtime
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=4321

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/astro.config.mjs ./astro.config.mjs

# Copy build artifacts
# Note: Since the project uses @astrojs/vercel, the output might be in .vercel
# We copy dist just in case, and .vercel for the adapter output
COPY --from=build /app/dist ./dist
COPY --from=build /app/.vercel ./.vercel
COPY --from=build /app/public ./public

EXPOSE 4321

CMD ["yarn", "preview", "--host"]
