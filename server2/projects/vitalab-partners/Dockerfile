# Install dependencies only when needed
FROM node:18-alpine3.18 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.  openssl1.1-compat
RUN apk add --no-cache libc6-compat --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing openssl1.1-compat
WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json package-lock.json ./ 
COPY wg0.conf /app
RUN npm ci

# Rebuild the source code only when needed  openssl1.1-compat
FROM node:18-alpine3.18 AS builder
RUN apk add --update --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing openssl1.1-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1
RUN npx prisma generate

# RUN yarn build

# If using npm comment out above and use below instead
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine3.18 AS runner
# RUN apk add --update --no-cache sudo wireguard-tools  openssl1.1-compat
RUN apk add --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing openssl1.1-compat
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs \
        && mkdir -p /etc/sudoers.d \
        && echo "nextjs ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/nextjs \
        && chmod 0440 /etc/sudoers.d/nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/wg0.conf /etc/wireguard/wg0.conf

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p /app/r \
        && chown nextjs:nodejs /app/r

COPY --chown=nextjs:nodejs prisma ./prisma/
COPY --chown=nextjs:nodejs docker-bootstrap-app.sh ./
RUN chmod +x docker-bootstrap-app.sh

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

# CMD ["node", "server.js"]
CMD ["./docker-bootstrap-app.sh"]
