import { Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { UserAuth } from "../../firebase/Auth";

import dashboardContext from "../../context/dashboardContext";

const AddToDashboard = (props) => {
  const context = useContext(dashboardContext);
  const { currentUser } = UserAuth();
  let userCryptoInfo = [];
  let userNFTInfo = [];

  if (context) {
    userCryptoInfo = context.dashboard[0].dashboard.Cryptocurrency;
    userNFTInfo = context.dashboard[0].dashboard.NFT;
  }

  async function addToDashboard(element, asset) {
    if ((asset = "Cryptocurrency")) {
      context.dashboardDispatch({
        type: "ADD_CRYPTO_TO_DASHBOARD",
        payload: {
          user: currentUser.displayName,
          cryptocurrency: element.symbol,
        },
      });
    } else {
      context.dashboardDispatch({
        type: "ADD_NFT_TO_DASHBOARD",
        payload: {
          user: currentUser.displayName,
          NFT: element.symbol,
        },
      });
    }
    console.log("Conext" + context);
  }

  async function removeFromDashboard(element, asset) {
    if ((asset = "Cryptocurrency")) {
      context.dashboardDispatch({
        type: "REMOVE_CRYPTO_FROM_DASHBOARD",
        payload: {
          user: currentUser.displayName,
          cryptocurrency: element.symbol,
        },
      });
    } else {
      context.dashboardDispatch({
        type: "REMOVE_NFT_FROM_DASHBOARD",
        payload: {
          user: currentUser.displayName,
          NFT: element.symbol,
        },
      });
    }
    console.log("Conext" + context);
  }

  if (props.asset == "Cryptocurrency") {
    return (
      // {userCryptoInfo.  (props.element.symbol) ?
      <div>
        {userCryptoInfo.length > 0 &&
        userCryptoInfo.includes(props.element.symbol) ? (
          <Button
            variant="outline-primary"
            onClick={() => removeFromDashboard(props.element, props.asset)}
          >
            Remove From Watchlist
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => addToDashboard(props.element, props.asset)}
          >
            Add To Watchlist
          </Button>
        )}
      </div>
    );
  } else if (props.asset == "NFT") {
    return (
      // {userCryptoInfo.  (props.element.symbol) ?
      <div>
        {userNFTInfo.length > 0 &&
        userNFTInfo.includes(props.element.symbol.toLowerCase()) ? (
          <Button
            variant="outline-primary"
            onClick={() => addToDashboard(props.element, props.asset)}
            disabled
          >
            +
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => addToDashboard(props.element, props.asset)}
          >
            +
          </Button>
        )}
      </div>
    );
  }
};

export default AddToDashboard;
