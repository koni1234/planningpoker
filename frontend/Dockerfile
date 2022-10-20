FROM node:16.18.0

WORKDIR /app

COPY package.json yarn.* ./
RUN yarn install

COPY . .

RUN rm -rf /usr/share/nginx/html/*
RUN mv dist/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT yarn install && nginx -g daemon off && yarn dev