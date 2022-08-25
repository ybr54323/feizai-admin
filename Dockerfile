FROM node:14-alpine as builder
WORKDIR /code
ADD package.json /code/
RUN npm i

ADD public /code/public
ADD src /code/src
ADD index.html vite.config.js .env /code
RUN npm run build

FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/dist /usr/share/nginx/html/feizai-admin
