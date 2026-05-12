import React, { createContext, useState } from "react";

export const movieSearchResult = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isSearchLoading, setSearchLoadingStatus] = useState(false);

  return (
    <movieSearchResult.Provider
      value={{ movies, setMovies, isSearchLoading, setSearchLoadingStatus }}
    >
      {children}
    </movieSearchResult.Provider>
  );
};
