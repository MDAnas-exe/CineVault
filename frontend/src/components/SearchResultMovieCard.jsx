import React from "react";

import { FaStar } from "react-icons/fa";
const MovieCard = ({ movie }) => {
  return (
    <div className="flex px-5 py-3 md:w-1/4 h-52 gap-1 border rounded-xl bg-white hover:scale-110 transition-all duration-500 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path || movie.backdrop_path}`}
        alt=""
        className="w-1/3 rounded-xl my-3"
      />
      <div className=" py-3">
        <h3>{movie.title}</h3>
        <span>
          {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
        </span>
        <div className="flex">
          {movie.vote_average
            ? Array.from({
                length: Math.round(movie.vote_average / 2),
              }).map((_, index) => <FaStar key={index} />)
            : "N/A"}
        </div>
        <span className="text-xs line-clamp-3 ">{movie.overview}</span>
      </div>
    </div>
  );
};

export default MovieCard;
