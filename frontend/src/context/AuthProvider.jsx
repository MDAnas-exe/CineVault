import { useState } from "react";
import { AuthContext } from "./AuthContext";

import { useQuery } from "@tanstack/react-query";

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/users/me", {
        credentials: "include",
      });

      return await response.json();
    },
    retry: false,
  });

  const value = { user, isLoggedIn: !!user, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
