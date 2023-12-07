FROM node:21 as build
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:21
COPY --from=build /app/dist/* /app
EXPOSE 3000
CMD ["node", "/app/src/main.js"]
