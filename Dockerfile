# Base image
FROM node:14

# Set working directory in image
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app

# Install all dependencies/library in image based on package.json
RUN npm install --silent

# Bundle app source
COPY . /app

# Build/Compile app in image
RUN npm run build:prod

# New stage
# Recreate new base image
FROM nginx:stable

# Delete all nginx default app inside current(new) stage
RUN rm -rf ./usr/share/nginx/html/*

# Copy compiled angular app from previous stage to current(new) stage
COPY --from=0 ./app/dist ./usr/share/nginx/html

# Copy the nginx setting to current(new) stage
COPY ./nginx.conf ./etc/nginx/nginx.conf

# Expose PORT
EXPOSE 4200