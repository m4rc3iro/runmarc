FROM node:11.6.0-alpine AS builder

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/

EXPOSE 3000
CMD ["npm", "start"]
