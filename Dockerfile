# Dockerfile for backend development
FROM node:22-slim AS base

RUN apt update -y && apt install -y openssl jq
RUN npm install -g pnpm

WORKDIR /app

# Copy package.json but temporarily remove the postinstall script
COPY package.json pnpm-lock.yaml ./
# This modifies package.json to remove the postinstall script
RUN cat package.json | jq 'del(.scripts.postinstall)' > package.json.tmp && mv package.json.tmp package.json

# Install dependencies without running postinstall
RUN pnpm install

# Copy the whole project
COPY . .

RUN pnpx prisma generate
ENV NODE_ENV=production

# Set entrypoint script (to run prisma migrate deploy)
COPY entry-point.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entry-point.sh

EXPOSE 8000

ENTRYPOINT [ "/usr/local/bin/entry-point.sh" ]