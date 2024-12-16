# Stage 1 Base and build
FROM node:18-alpine AS base

# Create app directory
WORKDIR /app

# Install pnpm
RUN apk update && apk add --no-cache openssl

# Create a non-root user
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Install global packages
RUN npm install -g pnpm turbo

# Copy monorepo dependency management files
COPY turbo.json .
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package*.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/database/package.json ./packages/database/package.json

# Copy source code
COPY apps/backend ./apps/backend
COPY packages/database ./packages/database

# Prune the workspace for backend and database
RUN turbo prune backend --docker

# Stage 2 Install dependencies from base stage
FROM base AS installer
WORKDIR /app

# Copy and install json files from app/out in base
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install -r

# Stage 3 Run the app
FROM base AS runner
WORKDIR /app

# Copy pruned source code from base
COPY --from=base /app/out/full/packages/database ./packages/database
COPY --from=base /app/out/full/apps/backend /app/apps/backend

# Copy over installed dependencies from installer
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/backend/node_modules /app/apps/backend/node_modules
COPY --from=installer /app/packages/database/node_modules /app/packages/database/node_modules

WORKDIR /app/packages/database

# Ensure correct permissions
RUN chown -R nodeuser:nodegroup /app

ARG DATABASE_URL
# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL

# Run prisma migrations
RUN npx prisma generate 

# Set working directory to backend
WORKDIR /app/apps/backend

# Ensure correct permissions
RUN chown -R nodeuser:nodegroup /app/apps/backend

# Expose the port the app runs on
EXPOSE 8000

# Switch to non-root user
USER nodeuser

# Command to run the application
CMD ["sh", "-c", "cd /app/packages/database && npx prisma migrate deploy && cd /app/apps/backend && pnpm start"]