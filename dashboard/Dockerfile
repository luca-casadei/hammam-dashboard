FROM node:latest AS build
WORKDIR "/dashboard"
COPY . .
RUN npm install

FROM build AS run
CMD [ "npm", "run", "dev"]