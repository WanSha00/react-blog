import { Children, createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import { json } from "react-router-dom";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user));

  },[state.user])

  const contextValue = {
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
