FROM node:13-alpine

RUN mkdir -p /app/node-docker
WORKDIR /app/node-docker

COPY package.json package-lock.json /app/node-docker

RUN npm install

COPY . /app/node-docker

EXPOSE 5000

CMD [ "node","index.js"]