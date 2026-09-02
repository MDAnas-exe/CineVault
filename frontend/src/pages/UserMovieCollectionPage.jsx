import { useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import MovieCard from "../components/ui/MovieCard";
import MovieSectionSkeleton from "../components/ui/skeletons/MovieSectionSkeleton";
import PageContentWrapper from "../components/layout/PageContentWrapper";
import SectionState from "../components/ui/SectionState";
import CollectionFilters from "../features/user-movie/components/CollectionFilters";
import emptySign from "../assets/images/reel.avif";
import errorSign from "../assets/images/errorSign.avif";
import { USER_MOVIE_COLLECTIONS } from "../constants/userMovie";
import { useSearchParams } from "react-router-dom";
import Reel from "../assets/images/reel.svg?react";
import useAuth from "../hooks/useAuth.js";
const UserMovieCollectionPage = () => {
  const { status } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const collection = USER_MOVIE_COLLECTIONS[status];
  if (!collection) return <Navigate to="/users/liked" replace />;

  useEffect(() => {
    document.title = user?.name
      ? `${user.name.split(" ")[0]}'s ${collection.title} Collection | CineVault`
      : `User's ${collection.title} Collection | CineVault`;
  }, [user, status]);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["user-movies", status + searchParams.toString()],
    queryFn: ({ pageParam, signal }) =>
      apiRequest({
        endpoint: `users/${status}?${searchParams.toString()}&page=${pageParam}`,
        method: "GET",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
    enabled: Boolean(collection),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.movies),
  });

  const observerRef = useRef(null);
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
          },
          { threshold: 0.2 },
        );
        observerRef.current.observe(node);
      }
    },
    [hasNextPage, fetchNextPage],
  );

  const movies = (data ?? []).map((movie) => ({
    ...movie,
    id: movie.movieId,
  }));

  const {
    title,
    emptyMessage,
    emptyFilteredMessage,
    emptyDescription,
    emptyFilteredDescription,
  } = collection;
  const hasAppliedFilters = Boolean(searchParams.toString());

  const header = (
    <>
      <CollectionFilters status={status} />
      <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
        {title}
      </h1>
    </>
  );

  if (isLoading) {
    return (
      <PageContentWrapper>
        {header}
        <MovieSectionSkeleton variant="grid" count={12} />
      </PageContentWrapper>
    );
  }

  if (isError) {
    return (
      <PageContentWrapper>
        {header}
        <MovieSectionSkeleton variant="grid" count={12} />
        <SectionState
          imageSource={errorSign}
          buttonText="Retry"
          message={`Couldn't load ${title.toLowerCase()}.`}
          description="Please check your connection and try again."
          onRetry={refetch}
        />
      </PageContentWrapper>
    );
  }

  if (movies.length === 0) {
    return (
      <PageContentWrapper>
        {header}
        <SectionState
          imageSource={emptySign}
          message={hasAppliedFilters ? emptyFilteredMessage : emptyMessage}
          description={
            hasAppliedFilters ? emptyFilteredDescription : emptyDescription
          }
        />
      </PageContentWrapper>
    );
  }

  return (
    <PageContentWrapper>
      {header}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-4 lg:grid-cols-6">
        {movies.map((movie, i) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            ref={i === movies.length - 1 ? sentinelRef : null}
            className="h-32 w-20 sm:h-56 sm:w-32 xl:w-36"
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
    </PageContentWrapper>
  );
};

export default UserMovieCollectionPage;
