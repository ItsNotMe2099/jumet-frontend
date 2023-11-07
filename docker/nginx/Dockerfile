ARG APP_IMAGE
FROM ${APP_IMAGE} as app

FROM nginx:stable-alpine

RUN apk add --update --no-cache \
    bash\
    curl

COPY  docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY  docker/nginx/server.conf /etc/nginx/conf.d/default.conf.template
COPY --from=app /usr/src/app/.next/static /var/www/public/_next/static
COPY --from=app /usr/src/app/public /var/www/public
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
