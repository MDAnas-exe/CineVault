import React from "react";

const HomeMovieCard = ({ movie }) => {
  return (
    <div
      className={
        "bg-[url(https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg)] w-30 h-50 bg-cover rounded-xl cursor-pointer hover:scale-110 transition-all duration-500"
      }
    ></div>
  );
};

export default HomeMovieCard;
