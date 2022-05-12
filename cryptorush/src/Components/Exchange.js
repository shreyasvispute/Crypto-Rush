import React, { useEffect, useState } from "react";
import nftNotFound from "../img/nft_imageNotFound.png";

import { Card, Container,  CardGroup, Spinner, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table'

const Exchanges= () => {
  
  let card = null;

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);


    
   
  useEffect(() => {
    const getData = async () => {
      try {
        const CoinGecko = require('coingecko-api');
        const CoinGeckoClient = new CoinGecko();
        let pData = await CoinGeckoClient.ping();

        let data = await CoinGeckoClient.exchanges.all();
      
        setApiData(data.data);
        setLoading(false);  

        if (data.data.length === 0) {
          setPageError(true);
        } else {
          setPageError(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const buildCard = (data) => {
    return (
      <div key={data.id} className="col sm-4">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Exchange</th>
              <th>Trust Score</th>
              <th>24h Volume(Normalized)</th>
              <th>24h Volume</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> <img alt={data.name} variant="top" src={data.image}/>{data.name}</td>
              <td>{data.trust_score}</td>
              <td>{data.trade_volume_24h_btc_normalized}</td>
              <td>{data.trade_volume_24h_btc}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

    card =
      apiData &&
      apiData.map((characterData) => {
        return buildCard(characterData);
      });

  if (pageError) {
    return (
      <Container>
        <Container className="headRow">
          <Row className="titleAlign">
            <h1>Exchange</h1>
          </Row>
          <Row>
            <h1>Not FOUND</h1>
          </Row>
        </Container>
      </Container>
    );
  } else {
    if (loading) {
      return (
        <div>
          <Container>
            <Spinner animation="border" variant="danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        </div>
      );
    } else {
      return (
        <Container>
          <Container className="headRow">
            <Row className="titleAlign">
              <h1>Exchanges</h1>
            </Row>
          </Container>
          <CardGroup>{card}</CardGroup>
        </Container>
      );
    }
  }
};

export default Exchanges;

