# build environment
FROM node:9-alpine as builder
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY package.json /home/node/app/package.json
RUN npm install
COPY . /home/node/app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /home/node/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
