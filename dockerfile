FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i 

RUN npm run build

ENV NODE_ENV production

EXPOSE 8000

CMD [ "npm", "run", "start" ]