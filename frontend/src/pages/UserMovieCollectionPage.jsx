import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import MovieCard from "../components/ui/MovieCard";
import MovieSectionSkeleton from "../components/ui/MovieSectionSkeleton";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import SectionState from "../components/ui/SectionState";
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

  const movies = data?.movies ?? [];
  const { title, emptyMessage } = collection;

  if (isLoading) {
    return (
      <PageContentWrapper>
        <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
          {title}
        </h1>
        <MovieSectionSkeleton variant="grid" count={12} />
      </PageContentWrapper>
    );
  }

  if (isError) {
    return (
      <PageContentWrapper>
        <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
          {title}
        </h1>
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
        <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
          {title}
        </h1>
        <SectionState
          imageSource={emptySign}
          message={emptyMessage}
          description="Movies you add will appear here."
        />
      </PageContentWrapper>
    );
  }

  return (
    <PageContentWrapper>
      <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
        {title}
      </h1>
      <div className="grid gap-x-4 gap-y-4 grid-cols-4  lg:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id || movie.movieId} movie={movie} />
        ))}
      </div>
    </PageContentWrapper>
  );
};

export default UserMovieCollectionPage;
