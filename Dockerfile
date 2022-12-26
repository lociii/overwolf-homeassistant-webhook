FROM node:18.12-buster-slim

ENV LC_ALL=C.UTF-8
ARG DEBIAN_FRONTEND=noninteractive

USER root

WORKDIR /app
RUN chown node:node /app

# install git (required for vscode)

RUN apt -y update && apt -y --no-install-recommends install git

# switch to node user
USER node

# make room for vscode extensions
RUN mkdir -p /home/node/.vscode-server/extensions /home/node/.vscode-server-insiders/extensions
RUN chown -R node:node /home/node/.vscode-server /home/node/.vscode-server-insiders

# install node packages
COPY --chown=node package*.json /app/
RUN npm install
