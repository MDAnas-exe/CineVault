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
    queryFn: async ({ signal }) =>
      apiRequest({
        method: "GET",
        endpoint: "users/me",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const value = { user, isLoggedIn: !!user, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
