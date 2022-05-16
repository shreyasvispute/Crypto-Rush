import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import dashboard from "../../src/dashboard.css";

const NewsScroll = (props) => {
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState(undefined);
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);

  let { exchange } = useParams();
  // if (exchange === undefined) {
  //   exchange = "cryptocurrencies";
  // }
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`/news/${props.exchange}`);

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
  }, [exchange]);

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
        <Card.Footer className="text-muted publishDate">
          Published At{"  "}
          {data.published_date?.split(" ")[0]}
        </Card.Footer>
      </Card>
    );
  };

  let card;

  card =
    apiData &&
    apiData.slice(0, 4).map((newsData) => {
      return buildCard(newsData);
    });

  if (apiData.length > 0) {
    return (
      <>
        <h3>Related News</h3>
        <CardGroup>{card}</CardGroup>
      </>
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
