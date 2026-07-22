import { useQuery } from "@tanstack/react-query";
export default function useFetchMoviesByCategory(endpoint, title) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/movies/${endpoint}`);
      if (!res.ok) throw new Error(`Couldn't load ${title} movies`);
      let data = await res.json();
      let movies = data.results;
      movies = movies.filter((m) => m.id && m.title);
      return movies;
    },
    staleTime: 30 * 60 * 1000,
  });

  return { movies: data || [], isLoading, isError, error, refetch };
}
