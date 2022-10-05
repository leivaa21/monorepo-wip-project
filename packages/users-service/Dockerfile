FROM node:18-alpine3.16 as users-service

RUN npm install -g npm@8.19.2

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm i -y

COPY src .
COPY tsconfig.json .


EXPOSE 3000

CMD ["npm", "run", "dev"]
