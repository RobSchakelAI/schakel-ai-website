FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build the application
RUN rm -rf dist server-dist && \
    npm run build && \
    npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server-dist/index.mjs

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production (this is safe to set at build time)
ENV NODE_ENV=production

# Railway injects environment variables at RUNTIME, not build time
# Do NOT set MAILERSEND_*, PORT, or other runtime secrets here
# They are automatically available as process.env.* when the container starts

# Copy dependencies from builder (includes dev deps needed for vite import)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server-dist ./server-dist

EXPOSE 8080

# Copy startup script
COPY start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]
