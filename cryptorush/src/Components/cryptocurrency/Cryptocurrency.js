import { useState, useEffect } from "react";
import Error from "../Error";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Dropdown,
  Card,
  ListGroup,
} from "react-bootstrap";
import CandleStickChart from "./CandleStickChart";
import { UserAuth } from "../../firebase/Auth";
import AddToDashboard from "../dashboard/AddToDashboard";

const Cryptocurrency = () => {
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState(undefined);
  const [chartData, setChartData] = useState(undefined);
  const [chartDuration, setChartDuration] = useState({
    duration: "24 hours",
    value: 24,
  });
  const [error, setError] = useState(false);
  const { currentUser, getUserToken } = UserAuth();

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

  function formatPrice(n) {
    return "$" + (Math.round(n * 100) / 100).toLocaleString();
  }

  const { symbol } = useParams();
  debugger;
  let dropdownItems = [
    "24 hours",
    "7 days",
    "1 Month",
    "3 Months",
    "6 Months",
    "12 Months",
  ];

  const cryptoDataURL = `/cryptocurrency/quotes/${symbol}`;

  let chartDataURL;
  if (
    chartDuration.duration.includes("hours") ||
    chartDuration.duration.includes("days")
  ) {
    chartDataURL = `/cryptocurrency/history/${symbol}/hours/${chartDuration.value}`;
  } else {
    chartDataURL = `/cryptocurrency/history/${symbol}/days/${chartDuration.value}`;
  }
  // chartDataURL = `/cryptocurrency/history/${symbol}/hours/${Number(
  //   chartDuration.value
  // )}`;

  //Function to make HTTP request to get data
  async function getCryptoData() {
    try {
      debugger;
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

  async function getChartData() {
    try {
      // const { data } = await axios.get(chartDataURL);
      const token = await getUserToken(currentUser);
      const { data } = await axios.get(chartDataURL, {
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
        debugger;
        // setCurrentPage(Number(page));
        const data = await getCryptoData();
        const chartingData = await getChartData();
        if (data) {
          setError(false);
        } else {
          setError(true);
        }
        if (chartingData) {
          setChartData(chartingData);
        }
        setCryptoData(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [symbol]);

  useEffect(() => {
    async function fetchData() {
      try {
        // setCurrentPage(Number(page));
        const data = await getCryptoData();
        const chartingData = await getChartData();
        // if (data) {
        //   setError(false);
        // } else {
        //   setError(true);
        // }
        if (chartingData) {
          setChartData(chartingData);
        }
        setCryptoData(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [chartDuration]);

  async function changeInterval(interval) {
    debugger;
    let duration = interval.replace(/[^A-Za-z]/g, "");
    let value = interval.match(/\d+/)[0];
    if (duration.includes("day")) {
      setChartDuration({
        duration: interval,
        value: value * 24,
      });
    } else if (duration.includes("Month")) {
      setChartDuration({
        duration: interval,
        value: value * 30,
      });
    } else {
      setChartDuration({
        duration: interval,
        value: value,
      });
    }

    const chartingData = await getChartData();
    if (chartingData) {
      setChartData(chartingData);
    }
  }

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return (
      <div className="indContainer">
        {error && <Error />}

        {!error && (
          <Container className="mainContainer">
            <Row>
              <Col>
                <h1>
                  <img
                    src={cryptoData.logo}
                    alt={cryptoData.name}
                    className="navbar-brand"
                  />
                  {cryptoData.name} {cryptoData.symbol}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>{formatPrice(cryptoData.quote.USD.price)}</h2>

                {cryptoData.quote.USD.volume_change_24h > 0 ? (
                  <td className="positiveChange">
                    {"+" + cryptoData.quote.USD.volume_change_24h + "%"}
                  </td>
                ) : (
                  <td className="negativeChange">
                    {cryptoData.quote.USD.volume_change_24h + "%"}
                  </td>
                )}
              </Col>
              <Col md={1}>
                <AddToDashboard element={cryptoData} asset="Cryptocurrency" />
              </Col>
            </Row>

            <Row>
              <Col></Col>
              <Col className="chartDropdown" md={2}>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    {chartDuration.duration}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {dropdownItems.map((element) => {
                      return (
                        <Dropdown.Item
                          key={element}
                          onClick={() => changeInterval(element)}
                        >
                          {element}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col>
                <CandleStickChart chartData={chartData} />
              </Col>
            </Row>
            <Row>
              <Col>
                <ListGroup horizontal>
                  <ListGroup.Item>
                    <Row>Rank</Row>
                    <Row>{cryptoData.cmc_rank}</Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>Market Cap</Row>
                    <Row>
                      {convertToInternationalCurrencySystem(
                        cryptoData.quote.USD.volume_change_24h
                      )}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>Volume 24h</Row>
                    <Row>
                      {convertToInternationalCurrencySystem(
                        cryptoData.quote.USD.volume_24h
                      )}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>Circulating supply</Row>
                    <Row>
                      {convertToInternationalCurrencySystem(
                        cryptoData.quote.USD.volume_change_24h
                      )}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        )}

        {/* {!error && (
          <Container className="mainContainer">
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <img
                      src={cryptoData.logo}
                      alt={cryptoData.name}
                      className="navbar-brand cryptoLogo"
                    />{" "}
                    {cryptoData.symbol}
                  </Card.Header>
                  <Container>
                    <Row>
                      <Col></Col>
                      <Col xs={2} className="chartDropdown">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            {chartDuration.duration}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {dropdownItems.map((element) => {
                              return (
                                <Dropdown.Item
                                  key={element}
                                  onClick={() => changeInterval(element)}
                                >
                                  {element}
                                </Dropdown.Item>
                              );
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </Container>

                  <CandleStickChart chartData={chartData} />
                  <Card.Body>
                    <Card.Title>{cryptoData.name}</Card.Title>
                    <Card.Text className="charDesc">
                      {cryptoData.description}
                    </Card.Text>
                    <Card.Text className="charDesc">
                      Price: {cryptoData.quote.USD.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )} */}
      </div>
    );
  }
};

export default Cryptocurrency;
