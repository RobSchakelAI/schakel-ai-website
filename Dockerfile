FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build && \
    npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server-dist/index.mjs

# Clean up dev dependencies (but keep vite for dynamic import)
RUN npm prune --production && npm install vite

# Set NODE_ENV
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server-dist/index.mjs"]
