FROM node:9

USER node

#Run Express

RUN mkdir -p /home/node/app/api

WORKDIR /home/node/app/api

COPY package.json /home/node/app/api

COPY package-lock.json /home/node/app/api

RUN cd /home/node/app/api && npm install -save

COPY . /home/node/app/api

EXPOSE 8080

CMD ["npm", "run", "docker-dev"]