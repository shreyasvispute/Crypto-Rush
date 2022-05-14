import { Container, Col, Row } from "react-bootstrap";
import { UserAuth } from "../../firebase/Auth";
import { useContext, useState, useEffect } from "react";
import dashboardContext from "../../context/dashboardContext";
import CryptocurrencyList from "../cryptocurrency/CryptocurrencyList";
import Error from "../Error";
import axios from "axios";

const Dashboard = () => {
  const context = useContext(dashboardContext);
  console.log(context);
  const [cryptoData, setCryptoData] = useState(undefined);
  const [cryptoList, setCryptoList] = useState(undefined);
  const { currentUser, getUserToken } = UserAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const cryptoDataURL = `/cryptocurrency/listings/${cryptoList}`;

  // const cryptoSearchDataURL = `/cryptocurrency/search/${searchTerm}`;

  //Function to make HTTP request to get data
  async function getCryptoData() {
    try {
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
  // //Function to make HTTP request to get data
  // async function getCryptoSearchData() {
  //   try {
  //     // const { data } = await axios.get(cryptoSearchDataURL);
  //     const token = await getUserToken(currentUser);
  //     const { data } = await axios.get(cryptoSearchDataURL, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     return data;
  //   } catch (e) {
  //     console.log("Unable to fetch data.");
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        // setCurrentPage(Number(page));
        setCryptoList(context.dashboard[0].dashboard.Cryptocurrency.join(","));
        const data = await getCryptoData();
        if (data) {
          setError(false);
        } else {
          setError(true);
        }
        setCryptoData(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [cryptoList]);

  console.log(currentUser);
  return (
    <div>
      <Container className="mainContainer">
        <Row>
          <Col>Dashboard Component</Col>
        </Row>
        <Row>
          <Col>Watchlist</Col>
          <CryptocurrencyList cryptoData={cryptoData} />
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
