FROM node:16.18.0

WORKDIR /app

COPY package.json yarn.* ./
RUN yarn install

COPY . .
ENTRYPOINT yarn install && yarn start:dev