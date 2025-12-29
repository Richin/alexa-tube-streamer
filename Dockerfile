# Use Node.js LTS (Long Term Support) version
FROM node:18-slim

# Install Python3 and pip (required for yt-dlp) and ffmpeg (optional but often good for processing)
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Install yt-dlp via pip (always gets the latest version)
RUN python3 -m pip install -U yt-dlp

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD [ "node", "index.js" ]
