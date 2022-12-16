FROM node:16-alpine

LABEL version="1.0" description="Dockerfile for a Node.js app"

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]