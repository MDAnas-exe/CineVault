import React from "react";

const HomeMovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path})`,
      }}
      className="w-30 h-50 bg-cover rounded-xl cursor-pointer shrink-0 hover:scale-110 transition-all duration-500"
    />
  );
};

export default HomeMovieCard;
