FROM node:9.6.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./dist /usr/src/app/
RUN npm install -g local-web-server@2.6.1

COPY . /usr/src/app

CMD ws --port 8001 --spa index.html --directory ./control-center/
