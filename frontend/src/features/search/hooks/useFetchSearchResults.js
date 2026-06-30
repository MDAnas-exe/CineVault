import { useQuery } from "@tanstack/react-query";
export default function useFetchSearchResults(name, page) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/movies/search?name=${name}&page=${page}`,
      );
      if (!res.ok) throw new Error(`Couldn't load results for ${name}`);
      let data = await res.json();

      data.results = data.results.filter(
        (m) => m.id && (m.poster_path || m.backdrop_path),
      );

      const { results, ...rest } = data;
      return { movies: results, ...rest };
    },
  });

  return { results: data, isLoading, isError, refetch };
}
