# build environment
FROM node:9-alpine as builder
COPY package.json $PWD
RUN npm install
COPY . $PWD
RUN npm run build
