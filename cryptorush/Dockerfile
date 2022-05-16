FROM node

LABEL version="1.0"
LABEL description="This is the server for Crypto-Rush application"

WORKDIR /app

COPY ["package.json", "./"]

RUN npm i 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]