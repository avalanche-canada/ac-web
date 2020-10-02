FROM node:8.17.0

RUN apt-get update
RUN apt-get install -y nginx

COPY ./nginx.conf /etc/nginx/sites-available/avalanche
RUN ln -s /etc/nginx/sites-available/avalanche /etc/nginx/sites-enabled/avalanche

COPY ./dist /app
WORKDIR /app
RUN ls -la
RUN npm install --production
EXPOSE 9000
CMD service nginx start ;  exec npm --production start