import { Container, Col, Row, Spinner } from "react-bootstrap";
import { UserAuth } from "../../firebase/Auth";
import { useContext, useState, useEffect } from "react";
import dashboardContext from "../../context/dashboardContext";
import CryptocurrencyList from "../cryptocurrency/CryptocurrencyList";
import Error from "../Error";
import axios from "axios";
import NFTList from "../nfts/NFTList";

const Dashboard = () => {
  const context = useContext(dashboardContext);
  const [cryptoData, setCryptoData] = useState(undefined);
  // const [cryptoList, setCryptoList] = useState(undefined);
  const { currentUser, getUserToken } = UserAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  let cryptoList;

  const getStateURL = `/store/getState/USER`;

  async function fetchStateFromDB() {
    try {
      // const context = useContext(dashboardContext);
      let url = getStateURL.replace("USER", currentUser.uid);
      // const { data } = await axios.get(cryptoDataURL);
      const token = await getUserToken(currentUser);
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }

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
        let state = await fetchStateFromDB();
        console.log(state);
        debugger;

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
        } else if (state.dashboard.Cryptocurrency.length > 0) {
          cryptoList = state.dashboard.Cryptocurrency.join(",");
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

        // if (context.dashboard[0].dashboard.Cryptocurrency.length > 0) {
        //   cryptoList = context.dashboard[0].dashboard.Cryptocurrency.join(",");
        //   const data = await getCryptoData();
        //   if (data) {
        //     setError(false);
        //   } else {
        //     setError(true);
        //   }
        //   setCryptoData(data);
        //   setLoading(false);
        // } else {
        //   setCryptoData([]);
        //   setError(true);
        //   setLoading(false);
        // }
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [context]);

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
            <>
              <Row>
                <Col>Watchlist</Col>
                <CryptocurrencyList cryptoData={cryptoData} />
              </Row>
              {context && context.dashboard[0].dashboard.NFT ? (
                <Row>
                  <NFTList
                    nftData={context.dashboard[0].dashboard.NFT}
                  ></NFTList>
                </Row>
              ) : (
                <Row>
                  <NFTList
                    nftData={context.dashboard[0].dashboard.NFT}
                  ></NFTList>
                </Row>
              )}
            </>
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
