import React, { createContext, useState } from "react";

export const SearchLoadingContext = createContext(false);

export const SearchLoadingStatusProvider = ({ children }) => {
  const [isSearchLoading, setSearchLoadingStatus] = useState(false);

  return (
    <SearchLoadingContext.Provider
      value={{ isSearchLoading, setSearchLoadingStatus }}
    >
      {children}
    </SearchLoadingContext.Provider>
  );
};
