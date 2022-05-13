import { Container, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserAuth } from "../../firebase/Auth";
import AddToDashboard from "../dashboard/AddToDashboard";

const CryptocurrencyList = (props) => {
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

  if (props.cryptoData) {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              <ListGroupItem variant="primary">
                <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col>Symbol</Col>
                  <Col>Name</Col>
                  <Col>Price</Col>
                  <Col>Market Cap</Col>
                  <Col>24H Volume</Col>
                  <Col>24H Change</Col>
                </Row>
              </ListGroupItem>
              {props.cryptoData.map((element) => {
                return (
                  <ListGroupItem
                    key={element.id}
                    variant="secondary"
                    className="cryptoList"
                  >
                    {/* <Link to={`/Cryptocurreny/${element.symbol.toLowerCase()}`}> */}
                    <Row>
                      <Col>
                        <AddToDashboard
                          element={element}
                          asset="Cryptocurrency"
                        />
                      </Col>
                      <Link
                        className="cryptoList"
                        to={`/Cryptocurreny/${element.symbol.toLowerCase()}`}
                      >
                        <Col>
                          <img
                            src={element.logo}
                            alt={element.name}
                            className="cryptoLogo"
                          />
                        </Col>
                        <Col>{element.symbol}</Col>
                        <Col>{element.name}</Col>
                        {/* </Link> */}
                        <Col>{formatPrice(element.quote.USD.price)}</Col>
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
                      </Link>
                    </Row>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default CryptocurrencyList;
