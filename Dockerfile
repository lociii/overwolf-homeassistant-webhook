FROM node:23-bookworm-slim

ENV LC_ALL=C.UTF-8
ARG DEBIAN_FRONTEND=noninteractive

USER root

WORKDIR /app
RUN chown node:node /app

# install git (required for vscode)

RUN apt -y update && apt -y --no-install-recommends install ca-certificates git ssh

# switch to node user
USER node

# install node packages
COPY --chown=node package*.json /app/
RUN npm install
