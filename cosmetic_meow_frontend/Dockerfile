FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g react-scripts


# Copy the entire project
COPY cosmetic_meow_frontend/ /app/

# Build the React app
RUN npm run build

# Expose port 80
EXPOSE 80