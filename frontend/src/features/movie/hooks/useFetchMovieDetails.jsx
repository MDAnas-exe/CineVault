import { useQuery } from "@tanstack/react-query";

export default function useFetchMovieDetails(id) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/movies/${id}`);

      if (!res.ok) throw new Error("Couldn't load movie details.");

      return await res.json();
    },
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
  });

  return {
    movie: data,
    isLoading,
    isError,
    refetch,
  };
}
