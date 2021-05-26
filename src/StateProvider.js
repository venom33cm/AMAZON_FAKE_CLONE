import React, { createContext, useReducer, useContext } from "react";

//creating the data layer and the data which need to be sent
export const StateContext = createContext();

//wrapping the app component to provide this data all over other components
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pulling the data to be used in other components
export const GetContext = () => useContext(StateContext);
