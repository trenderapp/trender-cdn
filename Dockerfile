FROM node:18

# In docker container
WORKDIR /app

# Install require dependencies
RUN npm i -g yarn --force
COPY ./package*.json ./

# Copy all usefull files
COPY ./ ./
RUN yarn prepare:prod

CMD ["yarn", "poststart"]