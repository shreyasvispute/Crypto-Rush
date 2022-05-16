FROM node


WORKDIR /app

COPY ["package.json" ,"./"]

RUN npm i

COPY . .

EXPOSE 4001

CMD ["npm", "start"]