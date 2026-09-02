import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";
import MovieCard from "../../../components/ui/MovieCard";
import MovieSectionSkeleton from "../../../components/ui/MovieSectionSkeleton";
import emptySign from "../../../assets/images/reel.avif";
import errorSign from "../../../assets/images/errorSign.avif";
import SectionState from "../../../components/ui/SectionState";
import HorizontalScroller from "../../../components/ui/HorizontalScroller";
const HomeMovieSection = ({ title, endpoint }) => {
  const {
    data: movies = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const data = await apiRequest({
        endpoint: `movies/${endpoint}`,
        method: "GET",
      });
      return data.results
        .filter((movie) => movie.id && movie.title)
        .map(
          ({
            id,
            title,
            poster_path,
            release_date,
            genre_ids,
            popularity,
          }) => ({
            id,
            title,
            posterPath: poster_path,
            releaseDate: release_date,
            genres: genre_ids,
            popularity,
          }),
        );
    },
    staleTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return <MovieSectionSkeleton />;
  }

  if (isError)
    return (
      <section className="mx-5 my-2 overflow-hidden">
        <p className="md:text-xl lg:text-3xl font-bold text-primary  border-l-4 border-accent px-2 mb-1">
          {title}
        </p>
        <SectionState
          imageSource={errorSign}
          buttonText="Retry"
          message={`Couldn't load ${title} movies.`}
          description="Please check your connection and try again."
          onRetry={refetch}
        />
      </section>
    );

  if (movies.length === 0)
    return (
      <section className="mx-5 my-2 overflow-hidden">
        <p className="md:text-xl lg:text-3xl font-bold text-primary  border-l-4 border-accent px-2 mb-1">
          {title}
        </p>
        <SectionState
          imageSource={emptySign}
          buttonText="Refresh"
          message={`No ${title} movies available right now.`}
          description="Please check back later."
          onRetry={refetch}
        />
      </section>
    );

  return (
    <section className="mx-3 overflow-hidden">
      <p className="md:text-xl lg:text-3xl font-bold text-primary  border-l-4 border-accent px-2 md:ml-10">
        {title}
      </p>
      <HorizontalScroller ariaLabel={`${title} movies`}>
        <div className="flex items-center gap-4">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              showActions={true}
            />
          ))}
        </div>
      </HorizontalScroller>
    </section>
  );
};

export default HomeMovieSection;
