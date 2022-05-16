# Crypto-Rush

Now with more than 10,000 crypto assets worth around $2.21 trillion, there’s a plethora of data
that can help guide crypto supporters with various forms of insights and analysis. This data is a
powerful resource for investors who are looking for a deeper understanding of the
cryptocurrency market and want to analyze specific events. Our application, Crypto-Rush, aims
to provide insightful information into the crypto world ranging from cryptocurrencies to
exchanges down to NFTs with real-time and historical prices for major cryptocurrencies, news,
and social media integration and graphs to make data easily comprehensible.

Crypto-Rush is designed to be the premier platform for accessing live and historical market data to see the market fluctuations, news, and social media integration to provide the latest trends in the market and graphs with historical data to better assess judgments. We offer a customizable dashboard to get personalized updates and track different cryptocurrencies and NFTs to the user as well. Crypto-Rush eliminates the customer’s hassle of visiting and tracking different platforms for information as we can aggregate all data and provide a one-stop-shop to gain insights on trading crypto assets. With deep insight into current and past pricing, volume, and exchange info, the user can make the right decisions to stay ahead of the game.

## Installing

A step by step set of commands that tell you how to get project running on local environment

To run the project:

Server folder

```
<project path>/server
npm install
npm start
```

React client folder(cryptorush)

```
<project path>/cryptorush
npm install
npm start
```

A Dockerfile is included in the deployment, To run it:

```
docker-compose build
docker-compose up
```

## Technicals

### Dependent Technologies

Technologies used:

- [Firebase](https://firebase.google.com/) - Authentication and NoSQL Database (Firestore)
- [Context API](https://reactjs.org/docs/context.html) - Context API to serve state in our application
- [React](https://reactjs.org/) - A JS library for building user interfaces

### Independent Technologies

Technologies used:

- [Docker](https://www.docker.com/) - Docker used for containerizing the application
- [AWS](https://aws.amazon.com/s3/) - S3 bucket to store the Docker image

## Fundamentals

Application consumes REST API from Express using different external APIs that provide realtime, historical and charting data from sources that provide news, prices, realtime prices. Data from the application is aggregated in our application to provide correct data for user to make informed decision.

Sources Used:

- [Coin Market Cap](https://min-api.cryptocompare.com/) - Crypto compare api to get cryptocurrency api
- [Moralis SDK](https://moralis.io/) - NFT data prices and collectible information
- [Coingecko](https://www.coingecko.com/) - Gets the exchanges data
- [newscatcher](https://docs.newscatcherapi.com/) - Gets the latest news for cryptocurrency and NFTs

## Project Members

- Shreyas Vispute
- Hamza Buch
- Ashwin Joshi
- Alokit Gupta
- Kamal Nayal

### Folder Structure

    Crypto-Rush
     |__server
        |__ Node.js Server
     |__cryptorush
        |__ React App

## GitHub Repository

```
https://github.com/shreyasvispute/Crypto-Rush.git
```
