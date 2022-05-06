import { Container, Col, Row, Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from "./Error";
import axios from "axios";
import { useState, useEffect } from "react";

const Cryptocurrencies = () => {
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState(undefined);
  const [error, setError] = useState(false);

  let card = null;

  const cryptoDataURL = "/cryptocurrency/listings";

  //Function to make HTTP request to get data
  async function getCryptoData() {
    try {
      const { data } = await axios.get(cryptoDataURL);
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

  const buildCard = (crypto) => {
    return (
      <Col key={crypto.id}>
        <Link to={`/cryptocurreny/${crypto.id}`}>
          <Card style={{ width: "18rem", marginTop: "15px", padding: "5px" }}>
            <Card.Header>{crypto.name}</Card.Header>
            <Card.Img variant="top" alt={crypto.name} src={crypto.logo} />
            <Card.Body>
              <Card.Title>{crypto.symbol}</Card.Title>
              <Card.Text>Price: {crypto.quote.USD.price}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
  };

  if (cryptoData) {
    debugger;
    card =
      cryptoData &&
      cryptoData.map((crypto) => {
        return buildCard(crypto);
      });
  }

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
  } else {
    return (
      <div className="mainContainer">
        {error && (
          <Container>
            <Row>
              <Col>
                <Error />
              </Col>
            </Row>
          </Container>
        )}

        {!error && (
          <Container fluid>
            <Row>{card}</Row>
          </Container>
        )}
      </div>
    );
  }
};

export default Cryptocurrencies;
