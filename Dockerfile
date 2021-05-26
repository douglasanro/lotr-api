FROM node:14-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --production --silent

RUN yarn global add pm2

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["pm2-runtime", "dist/main.js"]
