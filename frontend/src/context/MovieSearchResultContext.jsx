import React, { createContext, useState } from "react";

export const movieSearchResult = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isSearchLoading, setSearchLoadingStatus] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResultError, setSearchResultError] = useState(false);
  return (
    <movieSearchResult.Provider
      value={{
        movies,
        setMovies,
        isSearchLoading,
        setSearchLoadingStatus,
        hasSearched,
        setHasSearched,
        searchResultError,
        setSearchResultError,
      }}
    >
      {children}
    </movieSearchResult.Provider>
  );
};
