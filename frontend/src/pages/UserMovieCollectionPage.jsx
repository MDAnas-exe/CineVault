import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import MovieCard from "../components/ui/MovieCard";
import MovieSectionSkeleton from "../components/ui/MovieSectionSkeleton";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import SectionState from "../components/ui/SectionState";
import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";

const UserMovieCollectionPage = ({ title, endpoint, emptyMessage }) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-movies", endpoint],
    queryFn: () => apiRequest({ endpoint: `users/${endpoint}`, method: "GET" }),
  });

  const movies = data?.movies ?? [];

  return (
    <PageContentWrapper>
      <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
        {title}
      </h1>

      {isLoading && <MovieSectionSkeleton variant="grid" count={12} />}

      {isError && (
        <SectionState
          imageSource={errorSign}
          buttonText="Retry"
          message={`Couldn't load ${title.toLowerCase()}.`}
          description="Please check your connection and try again."
          onRetry={refetch}
        />
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <SectionState
          imageSource={emptySign}
          message={emptyMessage}
          description="Movies you add will appear here."
        />
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <div className="grid grid-cols-2 content-between gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id || movie.movieId}
              movie={movie}
              className="h-58 w-38 sm:h-64 sm:w-42"
            />
          ))}
        </div>
      )}
    </PageContentWrapper>
  );
};

export default UserMovieCollectionPage;
