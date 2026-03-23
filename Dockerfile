FROM node:20-alpine AS build-stage
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]