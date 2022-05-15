import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import twitterLogo from "../img/twitter_logo.png";
import Heart from "react-animated-heart";
const Tweets = () => {
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState(undefined);

  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [isClick, setClick] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        let limit = 10;
        const url = `http://localhost:4000/tweets/${id}`;
        const data = await axios.get(url);

        if (data.data.length === 0) {
          setPageError(true);
        } else {
          setPageError(false);
          setLoading(false);
          setApiData(data.data);
          setShowsData(data.data);
        }
      } catch (error) {
        setPageError(true);
        console.log(error);
      }
    };
    getData();
  }, []);

  const buildCard = (data) => {
    return (
      <div key={data.id} className="col sm-4">
        <Row>
          <Col>
            <CardGroup>
              <Card style={{ width: "3rem", height: "3rem" }}>
                <Card.Img
                  variant="top"
                  style={{ width: "1rem", height: "3rem" }}
                  src={twitterLogo}
                />
                <Card.Header>{data.created_at}</Card.Header>
                <Card.Body>
                  <Card.Title>{data.user.name}</Card.Title>
                  <Card.Text>{data.text}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  Retweets:{data.retweet_count}{" "}
                  <Heart
                    style={{ width: "1rem", height: "3rem" }}
                    isClick={isClick}
                    onClick={() => setClick(!isClick)}
                  />
                  {data.favorite_count}
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  };

  let card;

  card =
    apiData &&
    apiData.slice(0, 5).map((characterData) => {
      return buildCard(characterData);
    });

  return (
    <Container>
      <Container className="headRow"></Container>
      <CardGroup>{card}</CardGroup>
    </Container>
  );
};

export default Tweets;
