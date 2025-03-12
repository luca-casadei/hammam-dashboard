FROM node:latest AS build
WORKDIR /building
COPY . .
RUN npm install
RUN npx tsc --build

FROM node:latest AS run
WORKDIR /detector
COPY --from=build /building/js .
COPY --from=build /building/package.json .
RUN npm i --omit=dev
CMD [ "node", "./js/index.js" ]