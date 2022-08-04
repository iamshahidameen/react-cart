import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    console.log('cleared cart', state);
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });

    //  Old/long method for decrease + remove item from list

    // const decreasedItem = state.cart.filter((item) => item.id === id);
    // console.log(decreasedItem);
    // console.log(decreasedItem, 'item obj');
    // if (decreasedItem[0].amount < 1) {
    //   dispatch({ type: 'REMOVE_ITEM', payload: id });
    // } else {
    //   dispatch({ type: 'DECREASE', payload: id });
    // }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
