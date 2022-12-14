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
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });

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
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: 'GET_ITEMS', payload: data });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        toggleAmount,
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
