# FROM node:9.6.1
# RUN mkdir /app
# ADD . /app
# WORKDIR /app
# RUN npm install

# EXPOSE 8001
# CMD ['node', 'index.js']

# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
EXPOSE 8001
# start app
CMD ["npm", "start"]