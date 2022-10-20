FROM node:16.14.2
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add firebase-tools
# --prod --frozen-lockfile

COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]
