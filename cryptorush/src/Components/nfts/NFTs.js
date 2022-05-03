import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Search from "../Search";
import nftNotFound from "../../img/nft_imageNotFound.png";

import { Card, Container, Col, CardGroup, Spinner, Row } from "react-bootstrap";

const NFTs = () => {
  let card = null;

  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  // const [totalRecords, setTotalRecords] = useState("");
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let limit = 20;
        // let page = Number(params.page);
        // if (isNaN(page)) {
        //   setPageError(true);
        //   return;
        // }
        // if (page === 0) {
        //   setPrevState(false);
        //   page = 0;
        // } else {
        //   setPrevState(true);
        // }

        // page += 1;
        // let offset = limit * page - limit;
        const url = `/nft/search/boredape/eth`;
        const data = await axios.get(url);

        // let totalPages = Math.ceil(totalRecords / limit) - 1;
        // setPages(totalPages);

        // if (page - 1 === totalPages) {
        //   setNextState(false);
        // } else {
        //   setNextState(true);
        // }
        setApiData(data.data);
        setLoading(false);

        if (data.data.length === 0) {
          setPageError(true);
        } else {
          setPageError(false);
        }
      } catch (error) {
        // setPageError(true);
        console.log(error);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    async function searchNFTs(searchTerm) {
      try {
        setPageError(false);

        const url = `/nft/search/${searchTerm}/eth`;
        const data = await axios.get(url);
        // setTotalRecords(data.length);
        setLoading(false);
        setSearchData(data.data);
      } catch (error) {
        setPageError(true);
        console.log(error);
      }
    }
    if (searchTerm) {
      // setPaginate(false);
      searchNFTs(searchTerm);
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const buildCard = (data) => {
    return (
      <div key={data.tokenId} className="col sm-4">
        <Card style={{ width: "16rem" }}>
          {data.image ? (
            <Card.Img alt={data.nftName} variant="top" src={data.image} />
          ) : (
            <Card.Img alt={data.nftName} variant="top" src={nftNotFound} />
          )}

          <Card.Body>
            {
              <Link to={`/NFT/${data.tokenAddress}`}>
                <Card.Title>{data.nftName}</Card.Title>
              </Link>
            }
            {/* <Card.Text>{data.description}</Card.Text> */}
          </Card.Body>
        </Card>
      </div>
    );
  };

  if (searchTerm) {
    card =
      searchData &&
      searchData.map((characters) => {
        return buildCard(characters);
      });
  } else {
    card =
      apiData &&
      apiData.map((characterData) => {
        return buildCard(characterData);
      });
  }

  if (pageError) {
    return (
      <Container>
        <Container className="headRow">
          <Row className="titleAlign">
            <h1>NFTs</h1>
          </Row>

          <Row>
            <Col>
              <Search page="NFTs" searchValue={searchValue}></Search>
            </Col>
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
              <h1>NFTs</h1>
            </Row>

            <Row>
              <Col>
                <Search page="NFTs" searchValue={searchValue}></Search>
              </Col>
              {/* <Col sm className="makeCenter filterMargin">
                {paginate && (
                  <Paginate
                    pageNum={params.page}
                    prevState={isPrev}
                    nextState={isNext}
                    page="characters"
                    currentPage={
                      Number(params.page) < 0 ? 0 : Number(params.page)
                    }
                    totalPages={pages}
                  ></Paginate>
                )}
              </Col> */}
              {/* <Col sm className="makeCenter filterMargin">
                Total Records Count: {totalRecords}
              </Col> */}
            </Row>
          </Container>
          <CardGroup>{card}</CardGroup>
        </Container>
      );
    }
  }
};

export default NFTs;
