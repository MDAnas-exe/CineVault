import React, { createContext, useState } from "react";

export const movieSearchResult = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  return (
    <movieSearchResult.Provider value={{ movies, setMovies }}>
      {children}
    </movieSearchResult.Provider>
  );
};
