import { useInfiniteQuery } from "@tanstack/react-query";
export default function useFetchSearchResults(name, page) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["search-movies", name],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `http://localhost:3000/movies/search?name=${name}&page=${pageParam}`,
      );
      if (!res.ok) throw new Error(`Couldn't load results for ${name}`);
      let data = await res.json();

      data.results = data.results.filter((m) => m.id && m.title);

      const { results, ...rest } = data;
      return { movies: results, ...rest };
    },
    enabled: !!name,
    staleTime: 15 * 60 * 1000,
    initialPageParam: page,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  return {
    results: data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  };
}
