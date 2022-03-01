const initialState = {
    favlist: []
  };
  export const favreducer = (state = initialState, action) => {
    switch (action.type) {
      case "FAV":
        return {
          favlist: favlist.push()
        };
      default:
        return state;
    }
  };
  