FROM node:12.22.1-alpine3.11

WORKDIR /IOET_exercise
COPY . .
RUN yarn install --production

CMD ["node","index.js"]

