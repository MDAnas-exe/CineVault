import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";
import MovieCard from "../../../components/ui/MovieCard";
import MovieSectionSkeleton from "../../../components/ui/MovieSectionSkeleton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import emptySign from "../../../assets/images/reel.png";
import errorSign from "../../../assets/images/errorSign.png";
import SectionState from "../../../components/ui/SectionState";
const HomeMovieSection = ({ title, endpoint }) => {
  const ref = useRef(null);
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
      return data.results.filter((m) => m.id && m.title);
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
      <div className="flex">
        <div
          className="hidden md:flex self-center px-3  cursor-pointer rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 "
          onClick={() => {
            ref.current.scrollLeft = ref.current.scrollLeft - 300;
          }}
        >
          <FaChevronLeft className="self-center h-10" />
        </div>
        <div
          className="flex items-center gap-4  overflow-x-scroll py-3 md:px-3"
          style={{ scrollbarWidth: "none" }}
          ref={ref}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              showActions={true}
              className="h-40 w-24 lg:h-50 lg:w-30"
            />
          ))}
        </div>
        <div
          className="hidden md:flex self-center px-3 ml-2 cursor-pointer rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 "
          onClick={() => {
            ref.current.scrollLeft = ref.current.scrollLeft + 300;
          }}
        >
          <FaChevronRight className="self-center h-10" />
        </div>
      </div>
    </section>
  );
};

export default HomeMovieSection;
