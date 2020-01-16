from node:8.16.2 as build

workdir /app-build 
copy package.json package-lock.json /app-build/
run npm install
copy ./ /app-build
run make


from node:8.16.2

copy --from=build /app-build/dist /app
workdir /app
run npm install --production
expose 9000
cmd ["npm", "--production", "start"]

