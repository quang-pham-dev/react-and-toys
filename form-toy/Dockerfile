# Development Stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment variable for development
ENV NODE_ENV=development

# Start the development server
CMD ["npm", "run", "dev"]
