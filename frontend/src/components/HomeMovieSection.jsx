import React from "react";
import HomeMovieCard from "./HomeMovieCard";
const HomeMovieSection = ({ title, movies, isLoading, errorMessage }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <section>
      <h2>{title}</h2>

      <div>
        {movies.map((movie) => (
          <HomeMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default HomeMovieSection;
