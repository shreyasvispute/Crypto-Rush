import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Card, Container, Col, CardGroup, Spinner, Row } from "react-bootstrap";

import Search from "../Search";
import nftNotFound from "../../img/nft_imageNotFound.png";
import { UserAuth } from "../../firebase/Auth";
import ReactPaginate from "react-paginate";

const NFTs = () => {
  let card = null;
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState("");
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);

  const [isPrev, setPrevState] = useState(true);
  const [isNext, setNextState] = useState(true);
  const [pages, setPages] = useState("");

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const { currentUser, getUserToken } = UserAuth();

  let itemsPerPage = 10;

  useEffect(() => {
    // Fetch items from another resources.
    if (apiData) {
      const endOffset = itemOffset + itemsPerPage;
      //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(apiData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(apiData.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, apiData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % apiData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const getData = async () => {
      try {
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
        const url = `/nft/search/cool%20cat/eth`;
        const token = await getUserToken(currentUser);

        const data = await axios.get(url, {
          headers: { authorization: `Bearer ${token}` },
        });

        // let totalPages = Math.ceil(totalRecords / limit) - 1;
        setPages(data.data.pageSize);

        // if (page - 1 === totalPages) {
        //   setNextState(false);
        // } else {
        //   setNextState(true);
        // }
        setApiData(data.data.results);
        setTotalRecords(data.data.total);

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
        const token = await getUserToken(currentUser);

        const data = await axios.get(url, {
          headers: { authorization: `Bearer ${token}` },
        });
        setTotalRecords(data.data.total);
        setPages(data.data.pageSize);
        setLoading(false);
        setSearchData(data.data.results);
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

  const buildCard = (data, i) => {
    return (
      <div key={i} className="col sm-4">
        <Card style={{ width: "16rem" }}>
          {data.image ? (
            <Card.Img alt={data.nftName} variant="top" src={data.image} />
          ) : (
            <Card.Img alt={data.nftName} variant="top" src={nftNotFound} />
          )}
          <Card.Body>
            {
              <Link to={`/NFT/${data.tokenAddress}/${data.tokenId}/eth`}>
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
      currentItems &&
      currentItems.map((characterData, index) => {
        return buildCard(characterData, index);
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
                <Search page="NFT" searchValue={searchValue}></Search>
              </Col>

              <Col sm className="makeCenter">
                <ReactPaginate
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< Previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />{" "}
              </Col>
              <Col sm className="makeCenter filterMargin">
                Total Records Count: {totalRecords}
              </Col>
            </Row>
          </Container>
          <CardGroup>{card}</CardGroup>
        </Container>
      );
    }
  }
};

export default NFTs;
