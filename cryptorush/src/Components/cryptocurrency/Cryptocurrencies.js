import {
  Container,
  Col,
  Row,
  Spinner,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
// import { Link } from "react-router-dom";
import Error from "../Error";
import axios from "axios";
import { useState, useEffect } from "react";
import Search from "../Search";
import ReactPaginate from "react-paginate";
import { UserAuth } from "../../firebase/Auth";
import CryptocurrencyList from "./CryptocurrencyList";

const Cryptocurrencies = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [cryptoData, setCryptoData] = useState(undefined);
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState(false);
  const { currentUser, getUserToken } = UserAuth();

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  let itemsPerPage = 20;

  useEffect(() => {
    // Fetch items from another resources.
    if (cryptoData) {
      const endOffset = itemOffset + itemsPerPage;
      //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(cryptoData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(cryptoData.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, cryptoData]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cryptoData.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  // let card = null;

  const cryptoDataURL = "/cryptocurrency/listings";

  const cryptoSearchDataURL = `/cryptocurrency/search/${searchTerm}`;

  //Function to make HTTP request to get data
  async function getCryptoData() {
    try {
      // const { data } = await axios.get(cryptoDataURL);
      const token = await getUserToken(currentUser);
      const { data } = await axios.get(cryptoDataURL, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } catch (e) {
      console.log("Unable to fetch data.");
    }
  }

  //Function to make HTTP request to get data
  async function getCryptoSearchData() {
    try {
      // const { data } = await axios.get(cryptoSearchDataURL);
      const token = await getUserToken(currentUser);
      const { data } = await axios.get(cryptoSearchDataURL, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } catch (e) {
      console.log("Unable to fetch data.");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // setCurrentPage(Number(page));
        const data = await getCryptoData();
        if (data) {
          setError(false);
        } else {
          setError(true);
        }
        setCryptoData(data);
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
        const data = await getCryptoSearchData(searchTerm);
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
      // setPagination(false);
      fetchData();
    } else {
      // setPagination(true);
    }
  }, [searchTerm]);

  // function convertToInternationalCurrencySystem(labelValue) {
  //   // Nine Zeroes for Billions
  //   return Math.abs(Number(labelValue)) >= 1.0e9
  //     ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
  //     : // Six Zeroes for Millions
  //     Math.abs(Number(labelValue)) >= 1.0e6
  //     ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
  //     : // Three Zeroes for Thousands
  //     Math.abs(Number(labelValue)) >= 1.0e3
  //     ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
  //     : Math.abs(Number(labelValue));
  // }

  // function formatPrice(n) {
  //   return "$" + (Math.round(n * 100) / 100).toLocaleString();
  // }

  // const buildCard = (crypto) => {
  //   return (
  //     <Col key={crypto.id}>
  //       <Card style={{ width: "18rem", marginTop: "15px", padding: "5px" }}>
  //         <Link to={`/cryptocurreny/${crypto.symbol}`}>
  //           <Card.Header>
  //             <img
  //               src={crypto.logo}
  //               alt={crypto.name}
  //               className="navbar-brand"
  //             />{" "}
  //             {crypto.symbol}
  //           </Card.Header>
  //           <Card.Img variant="top" alt={crypto.name} src={crypto.logo} />
  //         </Link>
  //         <Card.Body>
  //           <Card.Title>{crypto.name}</Card.Title>
  //           <Card.Text>Price: {crypto.quote.USD.price}</Card.Text>
  //           <Card.Text>Market Cap: {crypto.quote.USD.market_cap}</Card.Text>
  //           <Card.Text>
  //             24H Change: {crypto.quote.USD.volume_change_24h}
  //           </Card.Text>
  //           <Card.Text>24H Volume: {crypto.quote.USD.volume_24h}</Card.Text>
  //         </Card.Body>
  //       </Card>
  //     </Col>
  //   );
  // };

  const searchValue = async (value) => {
    if (value) {
      setSearchTerm(value.trim());
    }
  };

  // if (searchTerm) {
  //   setCryptoData(searchData);
  // }

  // if (cryptoData) {
  //   debugger;
  //   card =
  //     cryptoData &&
  //     cryptoData.map((crypto) => {
  //       return buildCard(crypto);
  //     });
  // }

  // if (socketData) {
  //   return <>{socketData["bitcoin"]}</>;
  // }

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
    // } else {
    //   return (
    //     <div className="mainContainer">
    //       {error && (
    //         <Container>
    //           <Row>
    //             <Col>
    //               <Error />
    //             </Col>
    //           </Row>
    //         </Container>
    //       )}

    //       {!error && (
    //         <Container fluid>
    //           <Row>{card}</Row>
    //         </Container>
    //       )}
    //     </div>
    //   );
    // }
  } else if (cryptoData) {
    return (
      <Container className="mainContainer">
        <Row>
          <Col></Col>
          <Col xs={4}>
            <Search searchValue={searchValue} />
          </Col>
          <Col></Col>
        </Row>
        {searchTerm && searchData.length > 0 ? (
          <CryptocurrencyList cryptoData={searchData} />
        ) : (
          <CryptocurrencyList cryptoData={currentItems} />
        )}
        {/* <Row>
          <Col>
            <ListGroup>
              <ListGroupItem variant="primary">
                <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col>Name</Col>
                  <Col>Symbol</Col>
                  <Col>Price</Col>
                  <Col>Market Cap</Col>
                  <Col>24H Volume</Col>
                  <Col>24H Change</Col>
                </Row>
              </ListGroupItem>
              {searchTerm && searchData.length > 0
                ? searchData.map((element) => {
                    let priceChangeColor;
                    if (
                      socketData &&
                      socketData[
                        element.name.split(" ").join("-").toLowerCase()
                      ] > element.quote.USD.price
                    ) {
                      priceChangeColor = "greenColumn";
                    } else {
                      priceChangeColor = "redColumn";
                    }

                    return (
                      <ListGroupItem key={element.id} className="cryptoList">
                        <Link
                          to={`/Cryptocurreny/${element.symbol.toLowerCase()}`}
                        >
                          <Row>
                            <Col>
                              <AddToDashboard
                                element={element}
                                asset="Cryptocurrency"
                              />
                            </Col>
                            <Col>
                              <img
                                src={element.logo}
                                alt={element.name}
                                className="cryptoLogo"
                              />
                              <Row>
                                <Col>{element.symbol}</Col>
                                <Col>{element.name}</Col>
                              </Row>
                            </Col>
                            {socketData &&
                            socketData[
                              element.name.split(" ").join("-").toLowerCase()
                            ] ? (
                              <Col className={priceChangeColor}>
                                {formatPrice(
                                  socketData[
                                    element.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()
                                  ]
                                )}
                              </Col>
                            ) : (
                              <Col>{formatPrice(element.quote.USD.price)}</Col>
                            )}{" "}
                            <Col>
                              {convertToInternationalCurrencySystem(
                                element.quote.USD.market_cap
                              )}
                            </Col>
                            <Col>
                              {convertToInternationalCurrencySystem(
                                element.quote.USD.volume_24h
                              )}
                            </Col>
                            {element.quote.USD.volume_change_24h > 0 ? (
                              <Col className="positiveChange">
                                {element.quote.USD.volume_change_24h + "%"}
                              </Col>
                            ) : (
                              <Col className="negativeChange">
                                {element.quote.USD.volume_change_24h + "%"}
                              </Col>
                            )}
                          </Row>
                        </Link>
                      </ListGroupItem>
                    );
                  })
                : currentItems &&
                  currentItems.map((element) => {
                    let priceChangeColor;
                    if (
                      socketData &&
                      socketData[
                        element.name.split(" ").join("-").toLowerCase()
                      ] > element.quote.USD.price
                    ) {
                      priceChangeColor = "greenColumn";
                    } else {
                      priceChangeColor = "redColumn";
                    }

                    return (
                      <ListGroupItem key={element.id} className={`cryptoList`}>
                        <Link to={`/cryptocurreny/${element.symbol}`}>
                          <Row>
                            <Col>
                              <AddToDashboard element={element} />
                            </Col>
                            <Col>
                              <img
                                src={element.logo}
                                alt={element.name}
                                className="cryptoLogo"
                              />
                            </Col>
                            <Col>{element.name}</Col>
                            <Col>{element.symbol}</Col>
                            {socketData &&
                            socketData[
                              element.name.split(" ").join("-").toLowerCase()
                            ] ? (
                              <Col className={priceChangeColor}>
                                {formatPrice(
                                  socketData[
                                    element.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()
                                  ]
                                )}
                              </Col>
                            ) : (
                              <Col>{formatPrice(element.quote.USD.price)}</Col>
                            )}{" "}
                            <Col>
                              {convertToInternationalCurrencySystem(
                                element.quote.USD.market_cap
                              )}
                            </Col>
                            <Col>
                              {convertToInternationalCurrencySystem(
                                element.quote.USD.volume_24h
                              )}
                            </Col>
                            {element.quote.USD.volume_change_24h > 0 ? (
                              <Col className="positiveChange">
                                {element.quote.USD.volume_change_24h + "%"}
                              </Col>
                            ) : (
                              <Col className="negativeChange">
                                {element.quote.USD.volume_change_24h + "%"}
                              </Col>
                            )}
                          </Row>
                        </Link>
                      </ListGroupItem>
                    );
                  })}
            </ListGroup>
          </Col>
        </Row> */}
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

export default Cryptocurrencies;
