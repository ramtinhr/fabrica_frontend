FROM node:14.3 as builder

RUN mkdir /src
WORKDIR /src
ADD ./package.json /src
ADD ./yarn.lock /src

RUN yarn install
ADD . /src
RUN yarn build --spa

FROM nginx:1.17-alpine AS app
WORKDIR /var/www/html

ADD ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /src/dist /var/www/html
# RUN mkdir my
# RUN mv assets/ my/
