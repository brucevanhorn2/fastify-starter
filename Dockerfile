# This is useful for simple development and testing.  There will be a compose file for
# a more substantial system.
FROM node:latest
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

CMD ["node", "dist/server.js"]
