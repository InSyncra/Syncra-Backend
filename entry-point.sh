#!/bin/sh
set -e

echo "Running database migrations..."
pnpx prisma migrate deploy

echo "Starting server..."

exec pnpm start