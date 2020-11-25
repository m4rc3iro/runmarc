##### Stage 1
FROM node:14.15.1-alpine AS builder
COPY . ./app
WORKDIR /app
RUN npm install
RUN $(npm bin)/ng build --aot --prod

##### Stage 2
FROM nginx:1.15.8-alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
