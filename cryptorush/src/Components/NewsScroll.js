import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsScroll = () => {
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState(undefined);
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);

  let { id } = useParams();
  if (id === undefined) {
    id = "cryptocurrencies";
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`/news/${id}`);

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
  }, [id]);

  const buildCard = (data) => {
    console.log(data);

    return (
      <Card className="newsCards" style={{ width: "16rem" }}>
        <Card.Img
          variant="top"
          className="newsImg"
          alt="news-topic"
          src={data.media}
        />

        <Card.Body>
          <Card.Subtitle>
            <a target="blank" href={`${data.link}`}>
              {data.title}
            </a>
          </Card.Subtitle>
        </Card.Body>
        <Card.Body className="twitterText">{data.excerpt}</Card.Body>
      </Card>
    );
  };

  let card;

  card =
    apiData &&
    apiData.slice(0, 5).map((newsData) => {
      return buildCard(newsData);
    });

  if (apiData.length > 0) {
    return (
      <Container>
        <h3>Related News</h3>
        <CardGroup>{card}</CardGroup>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h3>No News found</h3>
          </Col>
        </Row>
      </Container>
    );
  }
};
export default NewsScroll;
