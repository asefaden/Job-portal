FROM node:20-alpine

WORKDIR /app

# Copy server package files and install production dependencies
COPY Server/package*.json ./
RUN npm install --omit=dev

# Copy server source
COPY Server/ .

EXPOSE 3000

CMD ["node", "index.js"]
