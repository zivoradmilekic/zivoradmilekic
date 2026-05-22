# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

ARG RESUME_UUID
ENV RESUME_UUID=$RESUME_UUID
ARG RESUME_API_URL
ENV RESUME_API_URL=$RESUME_API_URL
ARG RESUME_API_KEY
ENV RESUME_API_KEY=$RESUME_API_KEY

# Build the static site
RUN yarn build

# Production stage - serve static files with nginx
FROM nginx:alpine AS runtime

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
