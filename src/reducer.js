export const initialState = {
  basket: [],
  user: null,
};
//summing up basket value
// export const getBasketTotal = (basket) => {
//   basket
//     ?.map((i) => i.price)
//     .reduce((ac, i) => {
//       return ac + i;
//     }, 0);
// };
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_ITEM":
      const newbasket = [...state.basket];
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index >= 0) {
        newbasket.splice(index, 1);
      } else {
        console.warn(`cant find the ${action.id} to delete`);
      }
      return {
        ...state,
        basket: newbasket,
      };

    case "AUTH_USER":
      return {
        ...state,
        user: action.user,
      };

    case "AFTER_ORDER":
      return {
        ...state,
        basket: [],
      };

    default: {
      return state;
    }
  }
};

export default reducer;
