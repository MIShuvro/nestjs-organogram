FROM node:16 as base

WORKDIR /app
COPY package.json\
    ./

RUN yarn --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune


FROM base AS dev
COPY nest-cli.json \
    tsconfig.* \
    ormconfig.ts \
    ./

COPY ./src/ ./src/
COPY ./migrations/ ./migrations/
RUN yarn

RUN yarn build


FROM node:16-alpine
COPY --from=base /app/package.json ./
COPY --from=dev /app/dist/ ./dist/
COPY --from=base /app/node_modules/ ./node_modules/

EXPOSE 3000

CMD ["node","dist/src/main"]
