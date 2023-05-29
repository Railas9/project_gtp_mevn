FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./public ./public
COPY ./src ./src
COPY vite.config.ts vite.config.ts
RUN yarn install
EXPOSE 8080
CMD ["yarn","start"]