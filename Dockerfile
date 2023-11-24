FROM node:18
WORKDIR /app
COPY package*.json ./app
ENV DB_NAME=db.sqlite
ENV COOKIE_KEY="asdfasdafs"
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
