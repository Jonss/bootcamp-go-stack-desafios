FROM node:10-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
CMD npm install
COPY . /usr/src/app
