FROM node:8.17.0 AS build

WORKDIR /app-build
COPY package.json package-lock.json /app-build/
RUN npm install
COPY ./ /app-build

FROM node:8.17.0

COPY --from=build /app-build/dist /app
WORKDIR /app
RUN npm install --production
EXPOSE 9000
CMD ["npm", "--production", "start"]