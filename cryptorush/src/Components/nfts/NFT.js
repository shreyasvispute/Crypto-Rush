import React, { useEffect, useState } from "react";
import axios from "axios";

import { Container, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const NFT = () => {
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [nftData, setNFTData] = useState(undefined);

  let { id, tokenId, chain } = useParams();

  useEffect(() => {
    async function getNFT(id, tokenId, chain) {
      try {
        debugger;
        setPageError(false);
        const url = `/nft/${id}/${tokenId}/${chain}`;
        const data = await axios.get(url);
        setLoading(false);
        console.log(data);
        setNFTData(data.data);
      } catch (error) {
        setPageError(true);
        console.log(error);
      }
    }

    // setPaginate(false);
    getNFT(id, tokenId, chain);
  }, [id, tokenId, chain]);

  return (
    <div>
      <Container className="mainContainer">
        <Row>
          <Col>{id}</Col>
          <Col>{chain}</Col>
          <Col>{tokenId}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default NFT;
