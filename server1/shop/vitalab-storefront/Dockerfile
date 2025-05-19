# Development image for hot reloading
FROM node:18-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn; \
    elif [ -f package-lock.json ]; then npm install; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm@9.15.6 && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

# The actual source code will be mounted as a volume
# No need to copy files here

EXPOSE 8000

ENV PORT 8000
ENV NODE_ENV development

# Use development mode with hot reloading
CMD ["npm", "run", "dev"]
