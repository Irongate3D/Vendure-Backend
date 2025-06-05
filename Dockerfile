# Use official Node.js image
FROM node:20-alpine as build

WORKDIR /app

# Copy only package files first for better cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the app
COPY . .

# Build the app
RUN npm run build


# --- Production image ---
FROM node:20-alpine

WORKDIR /app

# Copy only what's needed
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Expose default port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]