FROM node:21-alpine as production
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .
RUN npm install glob rimraf

RUN npm install 
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm run build


CMD ["node", "dist/main"]
