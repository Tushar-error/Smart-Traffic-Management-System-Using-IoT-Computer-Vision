# Build stage
FROM node:18-alpine AS build-stage

WORKDIR /app

# Accept VITE_API_URL as a build argument — Vite bakes env vars at BUILD time,
# not runtime, so passing them as Docker runtime env vars has no effect.
ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy SPA routing config (required — without it every page refresh returns 404)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
