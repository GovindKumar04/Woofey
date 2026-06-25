# Frontend (Vite + React) — dev server, reachable from the host
FROM node:24-slim

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the source
COPY . .

EXPOSE 5173

# --host exposes the dev server outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
