FROM node:18.17.0-alpine3.18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.17.0-alpine3.18 as production

WORKDIR /usr/src/app

COPY package*.json ./

ENV PORT=4000

ENV NODE_ENV=Production

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/main"]