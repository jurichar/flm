FROM node:22.2.0

WORKDIR /app/frontend/

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn","run","dev"]