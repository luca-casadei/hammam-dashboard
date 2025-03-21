FROM node:22-alpine AS build
WORKDIR /dashboard
COPY . .
RUN npm install
RUN npm audit fix --force
CMD [ "npm", "run", "dev" ]