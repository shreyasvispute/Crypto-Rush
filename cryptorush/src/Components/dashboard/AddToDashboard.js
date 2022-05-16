import { Button } from "react-bootstrap";
import { useContext } from "react";
import { UserAuth } from "../../firebase/Auth";

import dashboardContext from "../../context/dashboardContext";
import axios from "axios";

const AddToDashboard = (props) => {
  const context = useContext(dashboardContext);
  const { currentUser, getUserToken } = UserAuth();
  let userCryptoInfo = [];
  let userNFTInfo = [];

  // const setStateURL = `/store/setState`;
  const updateStateURL = `/store/updateState`;

  async function updateStateInDB() {
    try {
      let dashboard = context;
      const token = await getUserToken(currentUser);
      const { data } = await axios.post(updateStateURL, dashboard, {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  if (context) {
    userCryptoInfo = context.dashboard[0].dashboard.Cryptocurrency;
    userNFTInfo = context.dashboard[0].dashboard.NFT;
  }

  async function addToDashboard(element, asset) {
    // userCryptoInfo = context.dashboard[0].dashboard.Cryptocurrency;
    // userNFTInfo = context.dashboard[0].dashboard.NFT;
    if (asset === "Cryptocurrency") {
      await context.dashboardDispatch({
        type: "ADD_CRYPTO_TO_DASHBOARD",
        payload: {
          user: currentUser.uid,
          cryptocurrency: element.symbol,
        },
      });
      // await updateStateInDB();
    } else {
      await context.dashboardDispatch({
        type: "ADD_NFT_TO_DASHBOARD",
        payload: {
          user: currentUser.uid,
          NFT: element,
        },
      });
      // await updateStateInDB();
    }
    await updateStateInDB();
    console.log("Conext" + context);
  }

  async function removeFromDashboard(element, asset) {
    if (asset === "Cryptocurrency") {
      await context.dashboardDispatch({
        type: "REMOVE_CRYPTO_FROM_DASHBOARD",
        payload: {
          user: currentUser.uid,
          cryptocurrency: element.symbol,
        },
      });
      // await updateStateInDB();
    } else {
      await context.dashboardDispatch({
        type: "REMOVE_NFT_FROM_DASHBOARD",
        payload: {
          user: currentUser.uid,
          NFT: element,
        },
      });
      // await updateStateInDB();
    }
    await updateStateInDB();
    console.log("Conext" + context);
  }

  if (props.asset === "Cryptocurrency") {
    return (
      // {userCryptoInfo.  (props.element.symbol) ?
      <div>
        {userCryptoInfo.length > 0 &&
        userCryptoInfo.includes(props.element.symbol) ? (
          <Button
            variant="outline-primary"
            onClick={() => removeFromDashboard(props.element, props.asset)}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => addToDashboard(props.element, props.asset)}
          >
            Add
          </Button>
        )}
      </div>
    );
  } else if (props.asset === "NFT") {
    let index = userNFTInfo.findIndex(
      (x) =>
        x.tokenAddress === props.element.tokenAddress &&
        x.tokenId === props.element.tokenId
    );
    return (
      // {userCryptoInfo.  (props.element.symbol) ?
      <div>
        {userNFTInfo.length > 0 &&
        userNFTInfo[index]?.tokenAddress === props.element.tokenAddress ? (
          <Button
            variant="outline-primary"
            onClick={() => removeFromDashboard(props.element, props.asset)}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => addToDashboard(props.element, props.asset)}
          >
            Add
          </Button>
        )}
      </div>
    );
  }
};

export default AddToDashboard;
