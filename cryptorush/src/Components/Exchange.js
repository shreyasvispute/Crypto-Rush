import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import ExchangeInfo from "./ExchangeInfo";
import Error from "./Error";
import News from "./News";
import {
  Container,
  Col,
  Row,
  Image,
  Spinner,
  Card,
  Tooltip,
  Table,
  CardGroup,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Tweets from "./Tweets";
import "./Components.css";
import NewsScroll from "./NewsScroll";

function Exchange() {
  const { id } = useParams();
  const [exchange, setExchange] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchange = async () => {
      const { data } = await axios.get(`/Exchanges/${id}`);
      if (data) {
        setError(false);
      } else {
        setError(true);
      }
      // console.log(data)
      setExchange(data.data);
      setLoading(false);
    };
    fetchExchange();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    console.log({ exchange });
    return (
      <div className="indContainer">
        {error && <Error />}
        {!error && (
          <Container>
            <Row>
              <Col>
                <h1>
                  <img
                    src={exchange?.image}
                    alt={exchange?.name}
                    className="navbar-brand"
                  />
                  {exchange?.name}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <ExchangeInfo exchange={exchange.name}></ExchangeInfo>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Subtitle className="mb-2">
                          Exchange Details
                        </Card.Subtitle>
                        <Card.Text>
                          {" "}
                          <ListGroup horizontal>
                            <ListGroup.Item>
                              <Row>
                                <Col>Rank</Col>
                              </Row>
                              <Row>
                                <Col>{exchange?.trust_score_rank}</Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <Row>
                                <Col>Country</Col>
                              </Row>
                              <Row>
                                <Col>{exchange?.country}</Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <Row>
                                <Col>Year Established</Col>
                              </Row>
                              <Row>
                                <Col>{exchange?.year_established}</Col>
                              </Row>
                            </ListGroup.Item>
                          </ListGroup>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Tweets exchange={exchange.name}></Tweets>
              </Col>
            </Row>
            <Row>
              <Col>
                <NewsScroll exchange={exchange.name}></NewsScroll>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default Exchange;
