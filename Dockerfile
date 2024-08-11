FROM node:18

# Install concurrently to run multiple commands at the same time
RUN npm install -g concurrently

# Switch to app directory
WORKDIR /home/app

# Copy all files and folders to respective directories
COPY package*.json .
COPY . .

# ======= Run terminal commands =========

# Install root-level dependencies
RUN npm install


# Generate Prisma Client
RUN npx prisma generate


# Swtich to website directory and build next js
WORKDIR /home/app/website

RUN npm install
RUN npm run build

# Switch back to app directory
WORKDIR /home/app

# Open ports
EXPOSE 5555 5000 8080

# Start everything
CMD ["sh", "-c", "concurrently -k \"npx prisma studio\" \"npm run start\" \"cd website && PORT=8080 npm run start\""]