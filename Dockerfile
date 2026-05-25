# ─── Stage 1: Build the React / Vite app ────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

# Copy only dependency files first (layer-cache friendly)
COPY Client/package.json Client/package-lock.json* ./

RUN npm ci --legacy-peer-deps

# Copy the rest of the Client source
COPY Client/ .

# Build the Vite app (VITE_BACKEND_URL is read from Client/.env at build time)
RUN npm run build

# ─── Stage 2: Serve with nginx ───────────────────────────────────────────────
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA routing: serve index.html for any unmatched route
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
