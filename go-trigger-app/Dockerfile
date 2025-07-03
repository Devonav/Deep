# Stage 1: Build the Angular frontend using a modern Node.js version
FROM node:20-alpine AS JS_BUILD

# Set the working directory inside the container
WORKDIR /webapp

# Copy package files first to leverage Docker's build cache
COPY webapp/package.json webapp/package-lock.json ./

# Install dependencies using npm ci for a clean, reliable install
RUN npm ci

# Copy the rest of the webapp source code
COPY webapp/ .

# Build the application
RUN npm run build


# Stage 2: Build the Go backend
FROM golang:1.22.1-alpine3.18 AS GO_BUILD

# Copy the server source code
COPY server /server

# Set the working directory
WORKDIR /server

# Build the Go application
RUN go build -o /go/bin/server


# Stage 3: Create the final, lightweight production image
FROM alpine:3.18.6

# Copy the built frontend from the JS_BUILD stage
# Note: The output path for Angular builds is typically 'dist/<project-name>'
# Please verify this path in your 'angular.json' file under 'outputPath'
COPY --from=JS_BUILD /webapp/dist/go-trigger-app/ ./webapp/

# Copy the built backend binary from the GO_BUILD stage
COPY --from=GO_BUILD /go/bin/server ./

# Command to run the server when the container starts
CMD ./server