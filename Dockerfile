FROM node:19.5.0-alpine
# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*


RUN npm install --only=production

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
