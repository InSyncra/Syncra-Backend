# Scripts for running Syncra commands
# These commands add more functionality and allow for more complex commands to be run
# Preface each command with `make` (e.g. `make run`)

# Install all dependencies and hooks for the project
install:
	pnpm install
	pnpx lefthook install
	pnpx prisma generate
	pnpx prisma db push

# Run automated git committer
commit:
	git commit

# Run the project in dev mode
run:
	docker compose up -d
	pnpm start

# Stop the docker containers
stop:
	docker compose down

# Reset the entire database
reset:
	docker compose down -v --remove-orphans
	docker compose up -d
	pnpx prisma migrate reset --force
	pnpx prisma db push
	pnpx prisma generate

# Migrate and push changes to the database
migrate:
	pnpx prisma migrate dev --name "$(name)"
	pnpx prisma db push
	pnpx prisma generate

# Format and lint on modified files
check:
	pnpm dlx biome check --write $(shell git diff --name-only HEAD)
	git add $(shell git diff --name-only HEAD)

# Clean any cache and outdated node_modules
clean:
	pnpm cache clean
	rm -rf node_modules
	pnpm install
	pnpx prisma generate
