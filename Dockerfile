FROM node:9.8.0-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 8001

CMD [ "npm", "start" ]
