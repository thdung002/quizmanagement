FROM node:13-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENTRYPOINT [ "nodemon","app"]
