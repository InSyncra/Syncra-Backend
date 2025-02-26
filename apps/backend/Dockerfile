# Stage 1 Base and build
FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory
WORKDIR /app

# Install coreutils to enable chown
RUN apt-get update && apt-get install -y coreutils openssl

# Enable pnpm and turbo
RUN npm install -g turbo

# # Create a non-root user
# RUN addgroup --system nodegroup && adduser --system --ingroup nodegroup nodeuser

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
RUN turbo prune --scope=backend --scope=@repo/db --docker

# Stage 2 Install dependencies from base stage
FROM base AS installer
WORKDIR /app

# Copy and install json files from app/out in base
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# Use build cache for pnpm store
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -r --frozen-lockfile

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

# Set environment variables
ENV NODE_ENV=production

# Run prisma migrations
RUN npx prisma generate 

# Set working directory to backend
WORKDIR /app/apps/backend

# Expose the port the app runs on
EXPOSE 8000

# # Switch to non-root user
# USER nodeuser

# Command to run the application
CMD ["pnpm", "start"]