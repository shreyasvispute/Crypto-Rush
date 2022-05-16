import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Col,
  Row,
  Image,
  Card,
  Tooltip,
  Table,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AddToDashboard from "../dashboard/AddToDashboard";

import "../Components.css";
import NewsScroll from "../NewsScroll";

const NFT = () => {
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [nftData, setNFTData] = useState(undefined);

  let { id, tokenId, chain } = useParams();

  const getImage = (imageurl) => {
    const ipfsURL = "https://ipfs.io/ipfs/";

    let imageURL = "";
    if (imageurl.includes("ipfs://ipfs")) {
      imageURL = imageurl.replace("ipfs://ipfs", ipfsURL);
    } else if (imageurl.includes("ipfs://")) {
      imageURL = imageurl.replace("ipfs://", ipfsURL);
    } else {
      imageURL = imageurl;
    }
    return imageURL;
  };
  useEffect(() => {
    async function getNFT(id, tokenId, chain) {
      try {
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

  const getEllipsisTxt = (str, n = 4) => {
    if (str) {
      return `${str.substr(0, n)}...${str.substr(str.length - n, str.length)}`;
    } else if (str.length < 9) {
      return str;
    }
    return "";
  };

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (nftData) {
    return (
      <div>
        <Container className="mainContainer">
          <Row>
            <Col>
              <Row>
                <Col>
                  {" "}
                  <Image
                    className="nftimg"
                    src={getImage(nftData.metadata.image)}
                    alt={nftData.metadata.name}
                  ></Image>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  {" "}
                  <h1>{nftData.metadata.name}</h1>
                </Col>
                <Col md={1}>
                  <AddToDashboard element={nftData} asset="Cryptocurrency" />
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Card>
                    <Card.Body>
                      <Card.Subtitle className="mb-2 text-muted">
                        Lowest Price
                      </Card.Subtitle>
                      <Card.Text className="tokenPrice">
                        {nftData.tokenPrice}{" "}
                        <span className="tokenformat text-muted">ETH</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Subtitle className="mb-2">
                        Description
                      </Card.Subtitle>
                      <Card.Text>{nftData.metadata.description} </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Subtitle className="mb-2">Symbol</Card.Subtitle>
                      <Card.Text>{nftData.symbol} </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  {nftData.metadata.attributes && (
                    <Card>
                      <Card.Body>
                        <Card.Subtitle>Attributes</Card.Subtitle>

                        <Row xs={1} md={2} className="g-4">
                          {nftData.metadata.attributes.map((e, i) => {
                            return (
                              <Col>
                                <Card
                                  className="nft_attr"
                                  // style={{ width: "5rem" }}
                                >
                                  <Card.Header>{e.trait_type}</Card.Header>

                                  <Card.Body>
                                    <Card.Text className="nft_attr_val">
                                      {e.value}
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              </Col>
                            );
                          })}
                        </Row>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Subtitle>Details</Card.Subtitle>
                      <Table borderless className="nft_details">
                        <tbody>
                          <tr>
                            <td>Token Address</td>

                            <td>
                              <a
                                target="blank"
                                href={`https://etherscan.io/address/${nftData.token_address}`}
                              >
                                {getEllipsisTxt(nftData.token_address)}{" "}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Token Id</td>
                            <td>{getEllipsisTxt(nftData.token_id)}</td>
                          </tr>
                          <tr>
                            <td>Contract</td>
                            <td>{nftData.contract_type}</td>
                          </tr>
                          <tr>
                            <td>Blockchain</td>
                            <td>Ethereum</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <NewsScroll exchange={"nft"}></NewsScroll>
        </Container>
      </div>
    );
  }
};

export default NFT;
