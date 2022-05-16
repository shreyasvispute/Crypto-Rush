import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Container,
  Col,
  CardGroup,
  Spinner,
  Row,
  Button,
} from "react-bootstrap";
import nftNotFound from "../../img/nft_imageNotFound.png";
import AddToDashboard from "../dashboard/AddToDashboard";

const NFTList = (props) => {
  return (
    <CardGroup>
      {props.nftData.map((data, i) => {
        let widthVal;
        if (props.styleclass === "dashboard") {
          widthVal = "10rem";
        } else {
          widthVal = "16rem";
        }

        return (
          <Col md={3} key={i}>
            <div key={i} className="col sm-4">
              <Card className="nftCards" style={{ width: widthVal }}>
                {data.image ? (
                  <Card.Img alt={data.nftName} variant="top" src={data.image} />
                ) : (
                  <Card.Img
                    alt={data.nftName}
                    variant="top"
                    src={nftNotFound}
                  />
                )}
                <Card.Body>
                  {
                    <Link to={`/NFT/${data.tokenAddress}/${data.tokenId}/eth`}>
                      <Card.Title>{data.nftName}</Card.Title>
                    </Link>
                  }
                  {/* <Card.Text>{data.description}</Card.Text> */}
                </Card.Body>
                <Card.Body>
                  <AddToDashboard element={data} asset="NFT" />
                </Card.Body>
              </Card>
            </div>
          </Col>
        );
      })}
    </CardGroup>
  );
};

export default NFTList;
