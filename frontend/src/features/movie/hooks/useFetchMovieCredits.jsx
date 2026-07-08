import { useQuery } from "@tanstack/react-query";

export default function useFetchMovieCredits(id, type) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["movie-credits", id, type],

    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/movie/${id}/credits`);

      if (!res.ok) throw new Error("Couldn't load movie credits.");

      const data = await res.json();

      return data[type];
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
