FROM node:9

USER node

#Build angular first
RUN mkdir -p /home/node/app/web-app

WORKDIR /home/node/app/web-app

COPY web-app/package.json /home/node/app/web-app

COPY web-app/package-lock.json /home/node/app/web-app

RUN npm install -save

COPY web-app/. /home/node/app/web-app

# buidl:prod for production
CMD ["npm", "run", "build:dev"]

#Run Express

RUN mkdir -p /home/node/app/api

WORKDIR /home/node/app/api

COPY api/package.json /home/node/app/api

COPY api/package-lock.json /home/node/app/api

RUN npm install -save

COPY api/. /home/node/app/api

EXPOSE 8080

CMD ["npm", "run", "docker-dev"]