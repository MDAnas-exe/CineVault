import { useQuery } from "@tanstack/react-query";

export default function fetchCurrentUser() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/users/me", {
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const result = await response.json();
      return result;
    },
    retry: false,
  });

  return { data, isLoading, isError, error };
}
