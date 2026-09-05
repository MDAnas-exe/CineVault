import { AuthContext } from "./AuthContext.js";
import apiRequest from "../../utils/apiRequest.js";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({ children }) => {
  const { data: user, isLoading } = useQuery({
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

export default AuthProvider;
