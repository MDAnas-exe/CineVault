import { useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../hooks/useAuth.js";
import SearchResultMovieCard from "../features/search/components/SearchResultMovieCard";
import ErrorSign from "../assets/images/SearchResultErrorSign.png";
import EmptySign from "../assets/images/reel.png";
import SectionState from "../components/ui/SectionState";
import SearchButtonSkeleton from "../components/ui/SearchButtonSkeleton";
import Reel from "../assets/images/reel.svg?react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest.js";

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const queryParams = new URLSearchParams({ name });

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["search-movies", queryParams.toString()],
    queryFn: ({ pageParam }) =>
      apiRequest({
        endpoint: "movies/search?" + queryParams + "&page=" + pageParam,
        method: "GET",
      }),
    staleTime: 15 * 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    select: (data) => ({
      total_results: data.pages[0].total_results,
      movies: data.pages.flatMap((page) => page.results),
    }),
  });

  const movies = data?.movies ?? [];

  let filteredMovies = [];
  let seenIds = new Set();
  movies.forEach((m) => {
    if (m.id && (m.title || m.original_title) && !seenIds.has(m.id)) {
      seenIds.add(m.id);
      filteredMovies.push(m);
    }
  });

  const filteredMovieCount = filteredMovies.length;

  useEffect(() => {
    if (
      filteredMovieCount === 0 &&
      hasNextPage &&
      !isFetching &&
      !isFetchNextPageError
    ) {
      fetchNextPage();
    }
  }, [
    filteredMovieCount,
    hasNextPage,
    isFetching,
    isFetchNextPageError,
    fetchNextPage,
  ]);

  const queryClient = useQueryClient();

  const toBeFetchedIds = [];
  filteredMovies.forEach((m) => {
    if (!queryClient.getQueryData(["movie-status", m.id]))
      toBeFetchedIds.push(m.id);
  });

  const chunks = [];
  for (let i = 0; i < toBeFetchedIds.length; i = i + 20) {
    chunks.push(toBeFetchedIds.slice(i, i + 20));
  }

  const { user, isLoggedIn } = useAuth();

  const { data: userMovieStatus, isLoading: isUserMovieStatusLoading } =
    useQuery({
      queryKey: ["movie-status", user?._id, toBeFetchedIds.sort().join(",")],
      queryFn: async ({ signal }) => {
        const merged = [];
        const results = await Promise.allSettled(
          chunks.map((chunk) =>
            apiRequest({
              endpoint: `users/movie-status?ids=${chunk.sort().join(",")}`,
              method: "GET",
              signal,
            }),
          ),
        );

        results.forEach((result, i) => {
          if (result.status === "fulfilled") merged.push(...result.value);
          else
            merged.push(
              ...chunks[i].map((id) => ({
                movieId: id,
                isUserMovieStatusError: true,
              })),
            );
        });
        return merged;
      },
      retry: false,
      enabled: toBeFetchedIds.length > 0 && isLoggedIn,
    });

  filteredMovies = filteredMovies.map((movie) => ({
    ...movie,
    ...queryClient.getQueryData(["movie-status", movie.id]),
    isUserMovieStatusLoading: toBeFetchedIds.includes(movie.id)
      ? isUserMovieStatusLoading
      : false,
  }));

  if (!isUserMovieStatusLoading && userMovieStatus) {
    userMovieStatus.forEach((status) => {
      if (status.isUserMovieStatusError !== true)
        queryClient.setQueryData(["movie-status", status.movieId], status);
    });
  }

  const observerRef = useRef(null);
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
          },
          { threshold: 0 },
        );
        observerRef.current.observe(node);
      }
    },
    [hasNextPage, fetchNextPage],
  );

  const total_results = data?.total_results;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 justify-evenly px-4 sm:px-20 lg:px-40 py-5 bg-gray-100">
        <Skeleton width="30%" height={30} />
        <Skeleton width="15%" height={20} />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="flex gap-2 sm:gap-6 p-2 sm:p-4 lg:p-6 rounded-2xl bg-white border border-gray-200/60 shadow-sm"
            key={index}
          >
            <div className="h-40 w-25 sm:w-30 sm:h-40 lg:w-37.5 lg:h-50 shrink-0">
              <Skeleton height="100%" width="100%" borderRadius="0.75rem" />
            </div>
            <div className="flex flex-col justify-between w-full gap-2 sm:gap-0">
              <div className="flex items-center justify-between">
                <div className="w-2/3 lg:w-2/5">
                  <Skeleton height={28} />
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:gap-2">
                  <Skeleton width={50} height={20} />
                  <div className="hidden sm:block">
                    <Skeleton width={70} height={20} />
                  </div>
                </div>
              </div>
              <div className="w-2/5 sm:w-1/3">
                <Skeleton height={16} />
              </div>
              <div className="w-full lg:w-125">
                <Skeleton count={2} />
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center">
                <div className="hidden sm:block w-1/3">
                  <Skeleton height={22} />
                </div>
                <SearchButtonSkeleton />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-5 md:my-15">
        <SectionState
          imageSource={ErrorSign}
          buttonText="Retry"
          message="Something went wrong"
          description={`Couldn't load result for ${name} please try again later`}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="my-15">
        <SectionState
          imageSource={EmptySign}
          message={`No results for "${name}"`}
          description="Try checking your spelling or use less specific keywords."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 justify-evenly px-2 sm:px-15 lg:px-30 py-2 sm:py-5 bg-gray-100">
      <div className="flex flex-col">
        <span className="text-xl lg:text-2xl font-poppins font-bold">
          Results for <span className="text-accent">"{name}"</span>
        </span>
        <span className="text-gray-500 lg:text-base text-sm">
          {total_results} {total_results > 1 ? "results" : "result"} found
        </span>
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2">
        {filteredMovies.map((movie, i) => (
          <SearchResultMovieCard
            movie={movie}
            key={movie.id}
            ref={i === filteredMovies.length - 1 ? sentinelRef : null}
          />
        ))}
      </div>

      {isFetchingNextPage && (
        <Reel className="size-8  lg:size-15 animate-spin  self-center text-accent" />
      )}

      {isFetchNextPageError && (
        <SectionState
          message="Failed to load more movies."
          buttonText={"Retry"}
          onRetry={fetchNextPage}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;
