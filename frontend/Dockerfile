ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS prod-build
WORKDIR /usr/src/frontend
COPY . .
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM nginx:latest AS prod
COPY --from=prod-build /usr/src/frontend/dist /usr/share/nginx/html
COPY --from=prod-build /usr/src/frontend/nginx.conf /etc/nginx/conf.d/default.conf
