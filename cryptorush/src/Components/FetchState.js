import { Container, Col, Row } from "react-bootstrap";
import DashboardContext from "../context/dashboardContext";
import reducer from "../reducers/dashboardReducer";
import { UserAuth } from "../firebase/Auth";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const FetchState = ({ children }) => {
  const { currentUser, getUserToken } = UserAuth();
  const [initialState, setInitialState] = useState(reducer.initialState);
  const [dashboard, dashboardDispatch] = useReducer(
    reducer.reducer,
    initialState
  );

  const getStateURL = `/store/getState/USER`;

  // const setStateURL = `/store/setState`;

  async function fetchStateFromDB() {
    try {
      // const context = useContext(dashboardContext);
      let url = getStateURL.replace("USER", currentUser.uid);
      // const { data } = await axios.get(cryptoDataURL);
      const token = await getUserToken(currentUser);
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      setInitialState(data);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchStateFromDB();
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [initialState]);

  return (
    <DashboardContext.Provider value={{ dashboard, dashboardDispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default FetchState;
