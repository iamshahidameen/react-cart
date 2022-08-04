const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
    // return { loading: false, cart: [], total: 0, amount: 0 };
  }
  if (action.type === 'REMOVE_ITEM') {
    console.log('remove item running');
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === 'DECREASE') {
    const tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }
  return state;
};

export default reducer;
