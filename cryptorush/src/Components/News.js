import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import noImage from "../img/no_image.jpg";

const News = () => {
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState(undefined);
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);
  let { id } = useParams();
  if (id === undefined) {
    id = "cryptocurrencies";
  }
  //console.log(id)
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`/news`);

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
    debugger;
    return (
      <div key={data.url} className="col sm-4">
        <Row>
          <Col>
            <CardGroup>
              <Card style={{ width: "3rem", height: "3rem" }}>
                <Card.Img
                  variant="top"
                  src={data.urlToImage}
                  alt={data.title}
                />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Link href={data.url}>Read News</Card.Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  };

  const buildCard1 = (data) => {
    return (
      <div key={data._id} className="col sm-4 newsCards">
        <Card key={data._id} className="text-center" style={{ width: "16rem" }}>
          {data.media ? (
            <Card.Img
              alt={data._id}
              className="newsImage"
              variant="top"
              src={data.media}
            />
          ) : (
            <Card.Img
              className="newsImage"
              alt="image"
              variant="top"
              src={noImage}
            />
          )}
          <Card.Body>
            <Card.Title>
              {" "}
              <a target="blank" href={`${data.link}`}>
                {data.title}
              </a>
            </Card.Title>
            <Card.Text className="twitterText">{data.excerpt}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted publishDate">
            Published At{"  "}
            {data.published_date?.split(" ")[0]}
          </Card.Footer>
        </Card>
      </div>
    );
  };

  let card;
  if (id === "cryptocurrencies") {
    card =
      apiData &&
      apiData.map((characterData) => {
        return buildCard1(characterData);
      });
  } else {
    card =
      apiData &&
      apiData.slice(0, 5).map((characterData) => {
        return buildCard(characterData);
      });
  }

  return (
    <Container className="headRow">
      <h1>Headlines</h1>
      <CardGroup>{card}</CardGroup>
    </Container>
  );
};
export default News;
