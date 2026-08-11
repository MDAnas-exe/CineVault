import { useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../hooks/useAuth.js";
import SearchResultMovieCard from "../features/search/components/SearchResultMovieCard";
import ErrorSign from "../assets/images/SearchResultErrorSign.png";
import EmptySign from "../assets/images/reel.png";
import SectionState from "../components/ui/SectionState";
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

  useEffect(() => {
    if (filteredMovies.length === 0 && hasNextPage) fetchNextPage();
  }, [filteredMovies, hasNextPage, fetchNextPage]);

  const queryClient = useQueryClient();

  const toBeFetchedIds = [];
  filteredMovies.forEach((m) => {
    if (!queryClient.getQueryData(["movie-status", m.id]))
      toBeFetchedIds.push(m.id);
  });

  const { user, isLoggedIn } = useAuth();

  const {
    data: userMovieStatus,
    isLoading: isUserMovieStatusLoading,
    isError: isUserMovieStatusError,
  } = useQuery({
    queryKey: ["movie-status", user?._id, toBeFetchedIds.sort().join(",")],
    queryFn: () =>
      apiRequest({
        endpoint: `users/movie-status?ids=${toBeFetchedIds.sort().join(",")}`,
        method: "GET",
      }),
    retry: false,
    enabled: toBeFetchedIds.length > 0 && isLoggedIn,
  });

  useEffect(() => {
    if (
      !isUserMovieStatusLoading &&
      !isUserMovieStatusError &&
      userMovieStatus
    ) {
      userMovieStatus.forEach((status) =>
        queryClient.setQueryData(["movie-status", status.movieId], status),
      );
    }

    if (!isUserMovieStatusLoading && isUserMovieStatusError) {
    }
  }, [userMovieStatus, isUserMovieStatusLoading, isUserMovieStatusError]);

  filteredMovies = filteredMovies.map((movie) => ({
    ...movie,
    ...queryClient.getQueryData(["movie-status", movie.id]),
  }));

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
