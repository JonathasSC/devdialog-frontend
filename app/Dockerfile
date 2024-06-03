FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN npm i
RUN npm i -g pnpm
CMD ["npm", "run", "serve"]
EXPOSE 8080