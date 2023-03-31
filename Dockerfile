#build app
FROM node:latest
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY package*.json /usr/src/app/
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]