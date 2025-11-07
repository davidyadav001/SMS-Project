FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps || npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma

EXPOSE 3001

CMD ["npm", "run", "start:prod"]

