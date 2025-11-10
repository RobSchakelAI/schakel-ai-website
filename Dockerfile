FROM node:20-alpine AS builder

WORKDIR /app

# Declare build arguments - Railway passes all variables automatically
ARG MAILERSEND_API_KEY
ARG MAILERSEND_FROM_EMAIL
ARG MAILERSEND_TO_EMAIL
ARG NODE_ENV

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

# CRITICAL: Redeclare ALL ARGs in runner stage (ARGs don't carry over between stages!)
ARG MAILERSEND_API_KEY
ARG MAILERSEND_FROM_EMAIL
ARG MAILERSEND_TO_EMAIL

# Convert ARGs to runtime ENV variables
ENV NODE_ENV=production
ENV MAILERSEND_API_KEY=$MAILERSEND_API_KEY
ENV MAILERSEND_FROM_EMAIL=$MAILERSEND_FROM_EMAIL
ENV MAILERSEND_TO_EMAIL=$MAILERSEND_TO_EMAIL

# NOTE: Do NOT set PORT as ARG/ENV - Railway provides it dynamically at runtime

# Copy package files and install ALL dependencies (vite needed for dynamic import)
COPY package*.json ./
RUN npm ci

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server-dist ./server-dist

EXPOSE 8080

CMD ["node", "server-dist/index.mjs"]
