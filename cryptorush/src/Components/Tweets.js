import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import twitterLogo from "../img/twitter_logo.png";

const Tweets = (props) => {
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState(undefined);

  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [isClick, setClick] = useState(false);
  // const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        debugger;
        let limit = 10;
        const url = `/tweets/${props.exchange}`;
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

  const buildCard = (data, i) => {
    return (
      <div key={data.id} className="col sm-4">
        <Card style={{ width: "16rem" }} className="mb-2">
          <Card.Header>
            <Card.Img
              variant="top"
              style={{ width: "1rem", height: "1rem" }}
              src={twitterLogo}
            />{" "}
            {data.created_at.split("+")[0]}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <img
                className="twitterProfileLogo"
                src={data.user.profile_image_url}
                alt={i}
              />
              {"  "}
              {data.user.name}
              {"  "}
              <span className="twitterusername text-muted">
                @{data.user.screen_name}
              </span>
            </Card.Title>
            <Card.Text className="twitterText">{data.text}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
                {"  "}
                {data.favorite_count}
              </Col>

              <Col>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-repeat"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fillRule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
                {"  "}
                {data.retweet_count}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    );
  };

  let card;

  card =
    apiData &&
    apiData.slice(0, 10).map((characterData) => {
      return buildCard(characterData);
    });

  if (apiData.length > 0) {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Tweets</h3>
          </Col>
        </Row>
        <Row className="tweetsContainer">
          <Col>{card}</Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h3>No Tweets found</h3>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Tweets;
