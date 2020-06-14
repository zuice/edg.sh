FROM node

# Create app directory
WORKDIR /usr/app

RUN npm i -g lerna

# Bundle app source
COPY . . 

# Run this after so that we can get all the stuff for the monorepo
RUN npm run bootstrap

EXPOSE 3001
CMD ["npm", "run", "start:server"] 
