FROM node:12.13-alpine as development

WORKDIR /usr/src/ci_check

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --only=development
 
COPY . . 
  
RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/ci_check

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/ci_check/dist ./dist
COPY --from=development /usr/src/ci_check/prisma ./prisma

CMD ["npm", "run", "start:migrate:prod"]