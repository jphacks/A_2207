FROM node:16.14.2
WORKDIR /app

COPY package.json ./
RUN yarn install
# --prod --frozen-lockfile

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]
