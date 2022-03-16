FROM node:16-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

COPY . ./

RUN npm install

# RUN chown -R node /app/node_modules

# USER node

CMD ["npm", "run", "start"]
