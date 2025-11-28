## Dockerfile for backend (Node 18)
FROM node:18-bullseye-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .

# production image
FROM node:18-bullseye-slim
WORKDIR /app
COPY --from=build /app .
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "index.js"]
