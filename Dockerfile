FROM node

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install
WORKDIR /src

# Bundle app source
COPY . /src

EXPOSE  8080
CMD ["npm", "start"]

