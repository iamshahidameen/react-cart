const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
    // return { loading: false, cart: [], total: 0, amount: 0 };
  }
  return state;
};

export default reducer;
