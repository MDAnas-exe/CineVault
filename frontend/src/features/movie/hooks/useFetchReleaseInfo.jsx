import { useQuery } from "@tanstack/react-query";

export default function useFetchReleaseInfo(id) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["movie-release-info", id],

    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/movie/${id}/releaseinfo`);

      if (!res.ok) throw new Error("Couldn't load release information.");

      return res.json();
    },

    enabled: !!id,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
