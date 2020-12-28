FROM node:14.3 as builder

RUN mkdir /src
WORKDIR /src
ADD ./package.json /src
ADD ./yarn.lock /src

RUN yarn install
ADD . /src
RUN yarn build

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]
