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
  const [cryptoList, setCryptoList] = useState(undefined);
  const { currentUser, getUserToken } = UserAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [fetchContext, setFetchContext] = useState(true);

  const cryptoDataURL = `/cryptocurrency/listings/${cryptoList}`;

  // const cryptoSearchDataURL = `/cryptocurrency/search/${searchTerm}`;

  const getStateURL = `/store/getState/USER`;

  // const setStateURL = `/store/setState`;

  async function fetchStateFromDB() {
    try {
      debugger;
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

  // async function setStateInDB() {
  //   try {
  //     debugger;
  //     let url = setStateURL.replace("USER", currentUser.uid);
  //     let dashboard = context;
  //     const token = await getUserToken(currentUser);
  //     const { data } = await axios.post(url, {
  //       headers: { authorization: `Bearer ${token}` },
  //       dashboard,
  //     });
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }

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
        // if (fetchContext) {
        //   // if (dashboard) {
        //   //   context.dashboardDispatch({
        //   //     type: "SET_INITIAL_STATE",
        //   //     payload: {
        //   //       dashboard,
        //   //     },
        //   //   });
        //   // } else {
        //   //   context.dashboardDispatch({
        //   //     type: "ADD_USER",
        //   //     payload: {
        //   //       user: currentUser.uid,
        //   //     },
        //   //   });
        //   //   await setStateInDB();
        //   // }
        //   setFetchContext(false);
        // }
        // setCurrentPage(Number(page));

        let dashboard = await fetchStateFromDB();
        debugger;
        context.dashboardDispatch({
          type: "SET_INITIAL_STATE",
          payload: {
            dashboard,
          },
        });

        if (context.dashboard[0].dashboard.Cryptocurrency.length > 0) {
          setCryptoList(
            context.dashboard[0].dashboard.Cryptocurrency.join(",")
          );
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
