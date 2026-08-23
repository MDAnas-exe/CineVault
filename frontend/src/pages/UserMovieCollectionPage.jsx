import { useQuery } from "@tanstack/react-query";
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

const UserMovieCollectionPage = () => {
  const { status } = useParams();
  const collection = USER_MOVIE_COLLECTIONS[status];
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-movies", status],
    queryFn: () => apiRequest({ endpoint: `users/${status}`, method: "GET" }),
    enabled: Boolean(collection),
  });

  if (!collection) return <Navigate to="/users/liked" replace />;

  const movies = (data?.movies ?? []).map((movie) => ({
    ...movie,
    id: movie.movieId,
  }));
  const { title, emptyMessage } = collection;

  let content;

  if (isLoading) {
    content = <MovieSectionSkeleton variant="grid" count={12} />;
  } else if (isError) {
    content = (
      <SectionState
        imageSource={errorSign}
        buttonText="Retry"
        message={`Couldn't load ${title.toLowerCase()}.`}
        description="Please check your connection and try again."
        onRetry={refetch}
      />
    );
  } else if (movies.length === 0) {
    content = (
      <SectionState
        imageSource={emptySign}
        message={emptyMessage}
        description="Movies you add will appear here."
      />
    );
  } else {
    content = (
      <div className="grid grid-cols-4 gap-x-4 gap-y-4 lg:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }

  return (
    <PageContentWrapper>
      <CollectionFilters status={status} />
      <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
        {title}
      </h1>
      {content}
    </PageContentWrapper>
  );
};

export default UserMovieCollectionPage;
