# Use Node.js Alpine base image
FROM node:alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies with --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy the entire codebase to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to start your application 
CMD ["npm", "start"]
