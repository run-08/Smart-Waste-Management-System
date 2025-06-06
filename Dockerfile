# Stage 1: Build
# Base Image as Node
FROM node:18 AS build 

# Working Directory
WORKDIR /app
COPY . .
# Install All Dependency
RUN npm install

# Here Output would shows in this build , if you use "vue React " as /app/dist (or) /app/build ,  Else You are using React as /app/built
RUN npm run build

# Stage 2: Serve with Nginx
# Nginx is a web server efficiently used for showing static Files of CSS , HTML or JS And Run on Alpine OS
FROM nginx:alpine

# It Would Copied The Compiled output where in /app/dist and Copies into /usr/share/nginx/html (default front-end show of nginx web server)
# It is final Layer And 1st layer from The Stack and Bottom Layer as a view of Queue
COPY --from=build /app/dist /usr/share/nginx/html 


# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Browser Would Connect to the Port 80 for server Which runs in Container
EXPOSE 80

# Default Command
# In this "daemon off " would says , the nginx web server needs to run on the Docker Container not in Background , if nginx web server runs on background the container would run and exit immediately.So , it Must be run on Foreground mode only (inside a container )
# -g stands for an Global configurations 
CMD ["nginx", "-g", "daemon off;"]
    