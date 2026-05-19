import React from "react";
import { useNavigate } from "react-router-dom";
const HomeMovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path})`,
      }}
      onClick={() => {
        navigate(`/movie/${movie.id}`);
      }}
      className="w-30 h-50 bg-cover bg-center rounded-xl cursor-pointer shrink-0 hover:scale-110 transition-all duration-500"
    />
  );
};

export default HomeMovieCard;
