FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app


COPY cosmetic_meow_frontend/ /app/
# Install dependencies
RUN npm install

# Build the React app
RUN npm start

# Expose port 80
EXPOSE 3000