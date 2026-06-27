import React, { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import useFetchMovies from "../hooks/useFetchMovies";
import "react-loading-skeleton/dist/skeleton.css";
import HomeMovieCard from "./HomeMovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const HomeMovieSection = ({ title, endpoint }) => {
  const ref = useRef(null);
  const { movies, isLoading, isError, error } = useFetchMovies(endpoint, title);
  if (isLoading) {
    return (
      <div className="flex gap-3 flex-col px-3 md:px-6">
        <Skeleton width={250} height={40} />

        <div
          className="overflow-x-scroll flex gap-4 h-56 "
          style={{ scrollbarWidth: "none" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton width={120} height={200} borderRadius={12} key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

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
          className="flex items-center gap-4 h-48 lg:h-60 overflow-x-scroll md:px-3"
          style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
          ref={ref}
        >
          {movies.map((movie, index) => (
            <HomeMovieCard key={movie.id} movie={movie} index={index} />
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
