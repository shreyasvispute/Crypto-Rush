import { Container, Col, Row, Spinner } from "react-bootstrap";
import { UserAuth } from "../../firebase/Auth";
import { useContext, useState, useEffect } from "react";
import dashboardContext from "../../context/dashboardContext";
import CryptocurrencyList from "../cryptocurrency/CryptocurrencyList";
import Error from "../Error";
import axios from "axios";

const Dashboard = () => {
  const context = useContext(dashboardContext);
  const [cryptoData, setCryptoData] = useState(undefined);
  // const [cryptoList, setCryptoList] = useState(undefined);
  const { currentUser, getUserToken } = UserAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  let cryptoList;

  //Function to make HTTP request to get data
  async function getCryptoData() {
    try {
      const cryptoDataURL = `/cryptocurrency/listings/${cryptoList}`;

      // const { data } = await axios.get(cryptoDataURL);
      const token = await getUserToken(currentUser);
      const { data } = await axios.get(cryptoDataURL, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } catch (e) {
      console.log("Unable to fetch data.");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        console.log(context);
        if (context.dashboard[0].dashboard.Cryptocurrency.length > 0) {
          cryptoList = context.dashboard[0].dashboard.Cryptocurrency.join(",");
          const data = await getCryptoData();
          if (data) {
            setError(false);
          } else {
            setError(true);
          }
          setCryptoData(data);
          setLoading(false);
        } else {
          setCryptoData([]);
          setError(true);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [...Object.values(context.dashboard)]);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return (
      <div>
        <Container className="mainContainer">
          <Row>
            <Col>Dashboard Component</Col>
          </Row>
          {!error ? (
            <Row>
              <Col>Watchlist</Col>
              <CryptocurrencyList cryptoData={cryptoData} />
            </Row>
          ) : (
            <Row>
              <Col>{error}</Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
};

export default Dashboard;
