import { useState } from "react";
import { AuthContext } from "./AuthContext";
import apiRequest from "../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => apiRequest({ method: "GET", endpoint: "users/me" }),
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const value = { user, isLoggedIn: !!user, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
