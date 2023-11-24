FROM node:21
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV DB_NAME=db.sqlite
ENV COOKIE_KEY="asdfasdafs"
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
