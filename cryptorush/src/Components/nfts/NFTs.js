import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Card, Container, Col, CardGroup, Spinner, Row } from "react-bootstrap";

import Search from "../Search";
import NFTList from "./NFTList";
import nftNotFound from "../../img/nft_imageNotFound.png";
import { UserAuth } from "../../firebase/Auth";
import ReactPaginate from "react-paginate";

const NFTs = () => {
  let card = null;
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);

  const [isPrev, setPrevState] = useState(true);
  const [isNext, setNextState] = useState(true);
  const [pages, setPages] = useState("");

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const { currentUser, getUserToken } = UserAuth();

  let itemsPerPage = 12;

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
        const url = `/nft/search/cool%20cat/eth`;
        const token = await getUserToken(currentUser);

        const data = await axios.get(url, {
          headers: { authorization: `Bearer ${token}` },
        });

        setPages(data.data.pageSize);
        setApiData(data.data.results);

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
            <Row>
              <Col md={4} className="searchComponent">
                <Search page="NFT" searchValue={searchValue}></Search>
              </Col>
            </Row>
            {searchTerm && searchData.length > 0 ? (
              <NFTList nftData={searchData} styleclass="nfts"></NFTList>
            ) : (
              <NFTList nftData={currentItems} styleclass="nfts"></NFTList>
            )}
            <Row>
              <Col></Col>

              <Col md={8} className="paginateComponent">
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
            </Row>
          </Container>
        </Container>
      );
    }
  }
};

export default NFTs;
