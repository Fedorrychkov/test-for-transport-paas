FROM node:10.13.0-alpine as builder
WORKDIR /web
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY ./public /web/public
# RUN sed -i -r "s/%GOOGLE_ANALYTICS_ID%/${GOOGLE_ANALYTICS_ID}/g" /web/public/index.html
COPY ./src /web/src
COPY ./.eslintrc /web/.eslintrc
COPY ./config-overrides.js /web/config-overrides.js
RUN yarn build
EXPOSE 80

FROM nginx:1.13.9-alpine
COPY --from=builder /web/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD nginx -g 'daemon off;'
