FROM node:9

USER node

#Build angular first
RUN mkdir -p /home/node/app/web-app

WORKDIR /home/node/app/web-app

COPY package.json /home/node/app/web-app

COPY package-lock.json /home/node/app/web-app

RUN cd /home/node/app/web-app && npm install -save

RUN cd /home/node/app/web-app && npm i webpack --save-dev

#RUN npm install @angular/cli

COPY . /home/node/app/web-app

# buidl:prod for production
CMD ["npm", "run", "build:dev"]
