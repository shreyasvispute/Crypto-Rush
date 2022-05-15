import { Container, Col, Row, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from "./Error";
import axios from "axios";
import { useState, useEffect } from "react";
import Search from "./Search";
import ReactPaginate from "react-paginate";
//import { UserAuth } from "../../firebase/Auth";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [exchangeData, setExchangeData] = useState(undefined);
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState(false);
  //const { currentUser, getUserToken } = UserAuth();

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  let itemsPerPage = 20;

  useEffect(() => {
    // Fetch items from another resources.
    if (exchangeData) {
      const endOffset = itemOffset + itemsPerPage;
      //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(exchangeData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(exchangeData.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, exchangeData]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % exchangeData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  let card = null;

  const exchangeDataURL = "/exchanges";
  //const exchangeDataURL = "https://api.coingecko.com/api/v3/exchanges";
  const exchangeSearchDataURL = `/exchanges/search/${searchTerm}`;

  //const exchangeSearchDataURL = `https://api.coingecko.com/api/v3/search?query=${searchTerm}`;

  //Function to make HTTP request to get data
  async function getExchangeData() {
    try {
      const { data } = await axios.get(exchangeDataURL);
      return data;
    } catch (e) {
      console.log("Unable to fetch data.");
    }
  }

  //Function to make HTTP request to get data
  async function getExchangeSearchData() {
    try {
      const { data } = await axios.get(exchangeSearchDataURL);
      return data;
    } catch (e) {
      console.log("Unable to fetch data.");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // setCurrentPage(Number(page));
        const data = await getExchangeData();
        if (data) {
          setError(false);
        } else {
          setError(true);
        }
        setExchangeData(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExchangeSearchData(searchTerm);
        if (data) {
          setSearchData(data);
          setLoading(false);
          setError(false);
        }
      } catch (e) {
        setLoading(false);
      }
    }
    if (searchTerm) {
      debugger;
      // setPagination(false);
      fetchData();
    } else {
      // setPagination(true);
    }
  }, [searchTerm]);

  function convertToInternationalCurrencySystem(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }

  const searchValue = async (value) => {
    if (value) {
      setSearchTerm(value.trim());
    }
  };

  // const buildTable = async (e) => {
  //   debugger;
  //   return (
  //   );
  // };

  if (loading) {
    return (
      <Container>
        <Row>
          <Col>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  } else if (exchangeData) {
    return (
      <Container className="mainContainer">
        <Row>
          <Col></Col>
          <Col xs={4}>
            <Search searchValue={searchValue} />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Rank(#)</th>
                  <th>Exchange</th>
                  <th>Trust Score</th>
                  <th>24H Volume(Normalized)</th>
                  <th>24H Volume</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm && searchData.length > 0
                  ? searchData.map((element) => {
                      return (
                        <tr key={element.id}>
                          <td>{element.trust_score_rank}</td>
                          <td>
                            <Link to={`/Exchanges/${element.id}`}>
                              <img
                                src={element.image}
                                alt={element.name}
                                style={{ height: 42 }}
                              />

                              {element.name}
                            </Link>
                          </td>
                          <td>{element.trust_score}</td>
                          <td>
                            {convertToInternationalCurrencySystem(
                              element.trade_volume_24h_btc_normalized
                            )}
                          </td>
                          <td>
                            {convertToInternationalCurrencySystem(
                              element.trade_volume_24h_btc
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : currentItems &&
                    currentItems.map((e) => {
                      return (
                        <tr  key={e.id}>
                          <td>{e.trust_score_rank}</td>
                          <td>
                            <Link to={`/Exchanges/${e.id}`}>
                              <img
                                src={e.image}
                                alt={e.name}
                                style={{ height: 30 }}
                              />
                              {"  "}
                              {e.name}
                            </Link>
                          </td>
                          <td>{e.trust_score}</td>
                          <td>
                            {convertToInternationalCurrencySystem(
                              e.trade_volume_24h_btc_normalized
                            )}
                          </td>
                          <td>
                            {convertToInternationalCurrencySystem(
                              e.trade_volume_24h_btc
                            )}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
          </Col>
        </Row>
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
            />
          </Col>
        </Row>
      </Container>
    );
  } else {
    {
      <Container className="mainContainer">
        <Row>
          <Col>
            <Error />
          </Col>
        </Row>
      </Container>;
    }
  }
};

export default Exchanges;
