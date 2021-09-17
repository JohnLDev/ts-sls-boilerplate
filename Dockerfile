FROM lambci/lambda:build-nodejs12.x
USER root

RUN mkdir -p /home/node/app

WORKDIR /home/node/app


COPY package.json yarn.lock /home/node/app/

RUN npm install -g yarn
RUN yarn install 
RUN chmod 777 /home/node/app



CMD yarn start