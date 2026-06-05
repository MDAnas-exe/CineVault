import React from "react";
import { useNavigate } from "react-router-dom";
const HomeMovieCard = ({ movie, index }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-0.5 ">
      <p
        className="text-transparent text-3xl lg:text-6xl text-stroke-2 text-stroke-accent"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px #d4a017",
        }}
      >
        {index + 1}
      </p>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path})`,
        }}
        onClick={() => {
          navigate(`/movie/${movie.id}`);
        }}
        className="w-24 h-40 lg:w-30 lg:h-50 bg-cover bg-center rounded-xl cursor-pointer shrink-0 hover:scale-110 hover:ml-3 transition-all duration-500"
      />
    </div>
  );
};

export default HomeMovieCard;
