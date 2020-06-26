FROM node:8.16.2 AS build

WORKDIR /app-build
COPY package.json package-lock.json /app-buid/
RUN npm install
COPY ./ /app-build

FROM node:8.16.2

COPY --from=build /app-build/dist /app
WORKDIR /app
RUN npm install --production
EXPOSE 9000
CMD ["npm", "--production", "start"]