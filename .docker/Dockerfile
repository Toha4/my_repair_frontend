# Stage 0, "deps". Install dependencies only when needed
FROM node:20.11.0-alpine as deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json ./
COPY yarn*.lock ./

RUN yarn config set network-timeout 300000
RUN yarn install --frozen-lockfile

# Stage 1, "builder".  Rebuild the source code only when needed
FROM node:20.11.0-alpine as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# Stage 2, "runner".  Production image, copy all the files and run next
FROM node:20.11.0-alpine as runner

WORKDIR /app

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]