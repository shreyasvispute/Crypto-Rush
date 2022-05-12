import { Button } from "react-bootstrap";
import { useContext } from "react";
import { UserAuth } from "../firebase/Auth";

import dashboardContext from "../context/dashboardContext";

const AddToDashboard = (props) => {
  const context = useContext(dashboardContext);
  const { currentUser, getUserToken } = UserAuth();

  async function addToDashboard(element, asset) {
    console.log(element);
    if ((asset = "Cryptocurrency")) {
      context.dashboadDispatcher({
        type: "ADD_CRYPTO_TO_DASHBOARD",
        payload: {
          user: currentUser,
          cryptocurreccny: element,
        },
      });
    } else {
      context.dashboadDispatcher({
        type: "ADD_NFT_TO_DASHBOARD",
        payload: {
          user: currentUser,
          NFT: element,
        },
      });
    }
  }
  return (
    <Button
      variant="outline-primary"
      onClick={() => addToDashboard(props.element, props.asset)}
    >
      +
    </Button>
  );
};

export default AddToDashboard;
