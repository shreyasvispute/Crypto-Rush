const initialState = [
  {
    user: "",
    dashboard: {
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
    case "SET_INITIAL_STATE":
      debugger;
      let initialState = [
        {
          user: payload.dashboard.user,
          dashboard: {
            Cryptocurrency: payload.dashboard.dashboard.Cryptocurrency,
            NFT: payload.dashboard.dashboard.NFT,
          },
        },
      ];
      return [...initialState];
    case "ADD_USER":
      debugger;
      let new_state = [
        {
          user: payload.user,
          dashboard: {
            Cryptocurrency: [],
            NFT: [],
          },
        },
      ];
      return [new_state];

    case "ADD_CRYPTO_TO_DASHBOARD":
      debugger;
      prevState = [...state];
      index = prevState.findIndex((x) => x.user === payload.user);
      if (index === -1) {
        return [...prevState];
      } else {
        const user = prevState[index];
        if (!user.dashboard.Cryptocurrency.includes(payload.cryptocurrency)) {
          user.dashboard.Cryptocurrency.push(payload.cryptocurrency);
        }
        prevState[index] = user;
        return [...prevState];
      }

    case "ADD_NFT_TO_DASHBOARD":
      debugger;
      prevState = [...state];
      index = prevState.findIndex((x) => x.user === payload.user);
      if (index === -1) {
        return [...prevState];
      } else {
        const user = prevState[index];
        if (!user.dashboard.NFT.includes(payload.NFT)) {
          user.dashboard.NFT.push(payload.NFT);
        }
        prevState[index] = user;
        return [...prevState];
      }

    case "REMOVE_CRYPTO_FROM_DASHBOARD":
      debugger;
      prevState = [...state];
      index = prevState.findIndex((x) => x.user === payload.user);
      if (index === -1) {
        return [...prevState];
      } else {
        const user = prevState[index];
        let cryptoIndex = user.dashboard.Cryptocurrency.findIndex(
          (e) => e === payload.cryptocurrency
        );

        prevState[index].dashboard.Cryptocurrency.splice(cryptoIndex, 1);
        return [...prevState];
      }

    case "REMOVE_NFT_FROM_DASHBOARD":
      debugger;
      prevState = [...state];
      index = prevState.findIndex((x) => x.user === payload.user);
      if (index === -1) {
        return [...prevState];
      } else {
        const user = prevState[index];
        let nftIndex = user.dashboard.NFT.findIndex((e) => e === payload.NFT);

        prevState[index].dashboard.NFT.splice(nftIndex, 1);
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
