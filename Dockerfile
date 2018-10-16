FROM node:carbon

# Copy package.json only to temp folder, install its dependencies,
# set workdir and copy the dependnecies there
RUN mkdir /src
# This way, dependnecies are cached without the need of cacheing all files.
COPY package.json /tmp/
RUN cd /tmp && npm install --production --silent
RUN cp -a /tmp/node_modules /src/

COPY [".", "/app/"]
WORKDIR /src

WORKDIR "/app/"
# Copy the rest of the files to the container workdir

RUN yarn
RUN npm run build

RUN chmod +x ./entrypoint.sh

