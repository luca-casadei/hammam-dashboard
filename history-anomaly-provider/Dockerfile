FROM node:latest AS build
WORKDIR /building
COPY . .
RUN npm install
RUN npm run build

FROM node:latest AS run
WORKDIR /detector
COPY --from=build /building/js ./js
COPY --from=build /building/package.json .
RUN npm i --omit=dev
CMD [ "npm", "run", "start" ]