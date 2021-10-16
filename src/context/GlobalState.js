import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
    // check if there are movies on the local storage on wtched or watchlist
    watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
    watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // save movies on local storage
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        localStorage.setItem("watched", JSON.stringify(state.watched));
    }, [state]);
  
    // actions
    const addMovieToWatchlist = (movie) => {
      dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    };
  
    return (
      <GlobalContext.Provider
        value={{
          watchlist: state.watchlist,
          watched: state.watched,
          addMovieToWatchlist
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  };