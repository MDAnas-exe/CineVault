import { useState } from "react";
import { AuthContext } from "./AuthContext";
import apiRequest from "../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { data } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => apiRequest({ method: "GET", endpoint: "users/me" }),
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  console.log(error?.message);
  const value = { user, isLoggedIn: !!user, isLoading };
  console.log(user);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
