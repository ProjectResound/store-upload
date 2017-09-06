FROM nginx
COPY ./dist /usr/share/nginx/html
COPY ./nginx.prod.conf /usr/share/nginx/nginx.conf
RUN chmod -R 0755 /usr/share/nginx/html/assets/
COPY ./docker/docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
