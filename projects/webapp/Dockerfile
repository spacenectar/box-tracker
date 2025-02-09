FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN yarn install

COPY . .

CMD ["yarn", "dev"]
