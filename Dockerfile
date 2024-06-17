# prisma 4.8 doesn't like alpine on M1, so we keep bullseye for now
FROM node:18-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update -y \
  && apt-get install -y openssl dumb-init \
  && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node ./package.json ./yarn.lock ./tsconfig.json ./

RUN yarn install --frozen-lockfile --network-timeout 100000

COPY ./src ./src

RUN yarn build

USER node

ARG DB_NAME
ARG DB_URL

ENV DB_NAME $DB_NAME
ENV DB_URL $DB_URL

EXPOSE 33333

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
