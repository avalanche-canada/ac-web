FROM node:8.17.0

COPY ./dist /app
WORKDIR /app
RUN ls -la
RUN npm install --production
EXPOSE 9000
CMD ["npm", "--production", "start"]