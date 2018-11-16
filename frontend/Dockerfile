# stage: 1 - build
FROM node:8.12-alpine as build

RUN mkdir /app
WORKDIR /app
COPY ["package.json", "./"]
RUN yarn cache clean
RUN yarn
COPY . ./
RUN yarn build

# stage: 2 — the production environment
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]