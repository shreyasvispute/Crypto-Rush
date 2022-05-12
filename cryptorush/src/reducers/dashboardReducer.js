import { v4 as uuid } from "uuid";

const initialState = [
  {
    id: uuid(),
    user: "Trader1",
    portfolio: {
      Cryptocurrency: [],
      NFT: [],
    },
  },
];

let prevState = null;
let index = 0;
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_USER":
      return [
        ...state,
        {
          user: payload.user,
          dashboard: {
            Cryptocurrency: [],
            NFT: [],
          },
        },
      ];

    case "ADD_CRYPTO_TO_DASHBOARD":
      prevState = [...state];
      index = prevState.findIndex((x) => x.user === payload.user);
      if (index === -1) {
        return [...prevState];
      } else {
        const user = prevState[index];
        user.dashboard.Cryptocurrency.push(payload.cryptocurrency);
        // const newArray = prevState.map((x) => {
        //   if (x.id === payload.id) {
        //     x.selected = x.selected ? false : true;
        //   }
        // });
        prevState[index] = user;
        return [...prevState];
      }

    case "ADD_NFT_TO_DASHBOARD":
      prevState = [...state];
      index = prevState.findIndex((x) => x.user === payload.user);
      if (index === -1) {
        return [...prevState];
      } else {
        const user = prevState[index];
        user.dashboard.NFT.push(payload.cryptocurrency);
        // const newArray = prevState.map((x) => {
        //   if (x.id === payload.id) {
        //     x.selected = x.selected ? false : true;
        //   }
        // });
        prevState[index] = user;
        return [...prevState];
      }

    default:
      return state;
  }
};

let exported = {
  reducer,
  initialState,
};

export default exported;
