import { useState } from "react";
import { AuthContext } from "./context/AuthContext";
import fetchCurrentUser from "./hooks/useFetchCurrentUser";

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isError, error } = fetchCurrentUser();
  console.log(data, error);
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
