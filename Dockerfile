# build stage
FROM node:16 as build
ENV REACT_APP_ENV DOCKER

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm config set fetch-retry-maxtimeout=300000
RUN npm install 
COPY . ./
RUN npm run build

# final stage
FROM node:16

LABEL maintainer="bmswens@gmail.com"
EXPOSE 3000

WORKDIR /app

COPY --from=build /app/build ./build
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]