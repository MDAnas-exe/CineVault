import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HomeMovieCard from "./HomeMovieCard";
const HomeMovieSection = ({ title, movies, isLoading, errorMessage }) => {
  if (isLoading) {
    return (
      <div
        className="overflow-x-scroll flex gap-4 h-56 "
        style={{ scrollbarWidth: "none" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton width={120} height={200} borderRadius={12} key={i} />
        ))}
      </div>
    );
  }

  if (errorMessage) {
    console.log(errorMessage);

    return <div>{errorMessage}</div>;
  }

  return (
    <section className="overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
      <h2>{title}</h2>

      <div className="flex gap-4 h-56">
        {movies.map((movie) => (
          <HomeMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default HomeMovieSection;
