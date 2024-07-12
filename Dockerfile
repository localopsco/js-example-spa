# Stage 1: Base
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Development
FROM base AS development

ENV PORT=3000
COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

# Stage 3: Build
FROM base AS build

ENV NODE_ENV=production

COPY . .
RUN npm run build

# Stage 4: Production
FROM nginx:alpine AS production

ENV PORT=3000

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
