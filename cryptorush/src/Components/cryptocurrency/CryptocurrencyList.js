import {
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserAuth } from "../../firebase/Auth";
import AddToDashboard from "../dashboard/AddToDashboard";

const CryptocurrencyList = (props) => {
  const { currentUser, getUserToken } = UserAuth();
  const [socketData, setSocketData] = useState([0]);

  useEffect(() => {
    const pricesWs = new WebSocket(
      // "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
      "wss://ws.coincap.io/prices?assets=ALL"
    );
    pricesWs.onmessage = function (msg) {
      try {
        setSocketData(JSON.parse(msg.data));
      } catch (error) {
        console.log(error);
      }
    };
    return () => pricesWs.close();
  }, []);

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
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Rank(#)</th>
              <th className="symbolwidth">Symbol</th>
              <th className="symbolwidth">Name</th>
              <th className="symbolwidth">Price</th>
              <th>Market Cap</th>
              <th>24H Volume</th>
              <th>24H Change</th>
            </tr>
          </thead>
          <tbody>
            {props.cryptoData.map((element, i) => {
              let priceChangeColor;
              if (
                socketData &&
                socketData[element.name.split(" ").join("-").toLowerCase()] >
                  element.quote.USD.price
              ) {
                priceChangeColor = "greenColumn";
              } else {
                priceChangeColor = "redColumn";
              }

              return (
                <tr key={element.id}>
                  <td>
                    <AddToDashboard
                      element={element}
                      asset="Cryptocurrency"
                      className="addOnAsset"
                    />
                  </td>
                  <td>
                    <span>{i}</span>
                  </td>
                  <td>
                    <Link
                      to={`/Cryptocurrency/${element.symbol.toLowerCase()}`}
                    >
                      <img
                        src={element.logo}
                        alt={element.name}
                        className="cryptoLogo"
                      />
                      {"   "}
                      {element.symbol}
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link
                      to={`/Cryptocurrency/${element.symbol.toLowerCase()}`}
                    >
                      {element.name}
                    </Link>
                  </td>
                  {socketData &&
                  socketData[
                    element.name.split(" ").join("-").toLowerCase()
                  ] ? (
                    <td className={priceChangeColor}>
                      {formatPrice(
                        socketData[
                          element.name.split(" ").join("-").toLowerCase()
                        ]
                      )}
                    </td>
                  ) : (
                    <td>{formatPrice(element.quote.USD.price)}</td>
                  )}
                  <td>
                    {convertToInternationalCurrencySystem(
                      element.quote.USD.market_cap
                    )}
                  </td>
                  <td>
                    {convertToInternationalCurrencySystem(
                      element.quote.USD.volume_24h
                    )}
                  </td>
                  {element.quote.USD.volume_change_24h > 0 ? (
                    <td className="positiveChange">
                      {"+" + element.quote.USD.volume_change_24h + "%"}
                    </td>
                  ) : (
                    <td className="negativeChange">
                      {element.quote.USD.volume_change_24h + "%"}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
};

export default CryptocurrencyList;
