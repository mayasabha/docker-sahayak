FROM node:20-alpine AS base
WORKDIR "/root/.node-red"
RUN  npm install -g --unsafe-perm node-red

FROM base AS dependencies
COPY .config.nodes.json .
COPY .config.runtime.json .
COPY settings.js .
COPY package.json .
RUN npm install

FROM dependencies AS build
COPY ./utilities ./utilities
COPY ./custom_nodes ./custom_nodes
# RUN npm install ./custom_nodes/custom-formula
RUN sh ./utilities/bash/install_custom_nodes.sh

FROM build AS production
COPY ./public ./public
EXPOSE 1880
CMD ["node-red"]
