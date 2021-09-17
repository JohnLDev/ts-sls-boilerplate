FROM lambci/lambda:build-nodejs12.x

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock /home/node/app/

RUN npm install -g yarn
RUN yarn install --frozen-lockfile

CMD yarn start