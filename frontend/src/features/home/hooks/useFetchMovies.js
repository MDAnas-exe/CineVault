import { useQuery } from "@tanstack/react-query";
export default function useFetchMovies(endpoint, title) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`${title}`],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/movies/${endpoint}`);
      if (!res.ok) throw new Error(`Couldn't load ${title} movies`);
      let data = await res.json();
      let movies = data.results;
      movies = movies.filter((m) => m.id && (m.poster_path || m.backdrop_path));
      return movies;
    },
  });

  return { movies: data || [], isLoading, isError, error, refetch };
}
