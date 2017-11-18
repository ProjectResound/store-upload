FROM nginx
COPY ./dist /usr/share/nginx/html
COPY ./nginx.prod.conf /usr/share/nginx/nginx.conf
RUN chmod -R 0755 /usr/share/nginx/html/assets/
COPY ./docker/docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /usr/share/nginx/html

USER nginx

ENTRYPOINT ["docker-entrypoint.sh"]
