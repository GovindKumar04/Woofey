# Backend (Express + Mongoose) — connects to MongoDB Atlas via MONGO_URI
FROM node:24-slim

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the source
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
