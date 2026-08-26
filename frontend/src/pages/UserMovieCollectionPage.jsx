import { useInfiniteQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import MovieCard from "../components/ui/MovieCard";
import MovieSectionSkeleton from "../components/ui/MovieSectionSkeleton";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import SectionState from "../components/ui/SectionState";
import CollectionFilters from "../features/user-movie/components/CollectionFilters";
import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";
import { USER_MOVIE_COLLECTIONS } from "../constants/userMovie";
import { useSearchParams } from "react-router-dom";
const UserMovieCollectionPage = () => {
  const { status } = useParams();
  const [searchParams] = useSearchParams();

  const collection = USER_MOVIE_COLLECTIONS[status];

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
    is,
  } = useInfiniteQuery({
    queryKey: ["user-movies", status + searchParams.toString()],
    queryFn: ({ pageParam }) =>
      apiRequest({
        endpoint: `users/${status}?${searchParams.toString()}&page=${pageParam}`,
        method: "GET",
      }),
    enabled: Boolean(collection),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.movies),
  });

  if (!collection) return <Navigate to="/users/liked" replace />;

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
      <div className="grid grid-cols-4 gap-x-4 gap-y-4 lg:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </PageContentWrapper>
  );
};

export default UserMovieCollectionPage;
