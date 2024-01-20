FROM node:18

# In docker container
WORKDIR /app

# Install require dependencies
RUN mkdir ./logs
RUN mkdir ./db-backup
RUN touch ./logs/access.log
RUN npm i -g yarn --force
COPY ./package*.json ./
RUN yarn install --production=true

# Copy all usefull files
COPY ./ ./
CMD ["yarn", "poststart"]