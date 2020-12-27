FROM node:14.3 as builder

RUN mkdir /src
WORKDIR /src
ADD ./package.json /src
ADD ./yarn.lock /src

RUN yarn install
ADD . /src
RUN yarn build


CMD [ "yarn", "start" ]
