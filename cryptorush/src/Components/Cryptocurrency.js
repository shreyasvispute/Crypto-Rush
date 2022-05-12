import { useState, useEffect } from "react";
import Error from "./Error";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Dropdown, Card } from "react-bootstrap";
import CandleStickChart from "./CandleStickChart";
import { HourglassSplit } from "react-bootstrap-icons";

const Cryptocurrency = () => {
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState(undefined);
  const [chartData, setChartData] = useState(undefined);
  const [chartDuration, setChartDuration] = useState({
    duration: "24 hours",
    value: 24,
  });
  const [error, setError] = useState(false);

  const { symbol } = useParams();

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
      const { data } = await axios.get(cryptoDataURL);
      return data;
    } catch (e) {
      console.log("Unable to fetch data.");
    }
  }

  async function getChartData() {
    try {
      const { data } = await axios.get(chartDataURL);
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
                <Card>
                  <Card.Header>
                    <img
                      src={cryptoData.logo}
                      alt={cryptoData.name}
                      className="navbar-brand"
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
        )}
      </div>
    );
  }
};

export default Cryptocurrency;
