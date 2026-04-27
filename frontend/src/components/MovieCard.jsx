import React, { useContext } from "react";
import { movieSearchResult } from "../context/MovieSearchResultContext";
import { FaStar } from "react-icons/fa";
const MovieCard = () => {
  const { movies } = useContext(movieSearchResult);
  console.log(movies);

  //   if (!movies || movies.length === 0) return null;
  return (
    <>
      {/* Temporary div to check fetched movies
      <div className="absolute top-16 left-0 w-full bg-gray-800 text-white p-4 z-50 flex flex-col gap-2">
        {movies.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div> */}
      <div className="bg-gray-300 p-3">
        <div className="flex px-5 py-3 w-1/4 h-52 gap-1 border rounded-xl bg-white">
          <img
            src="https://image.tmdb.org/t/p/w200/vE2fYcP07fbIHoouATNErRQuNrw.jpg"
            alt=""
            className="w-1/3 rounded-xl my-3"
          />
          <div className=" py-3">
            <h3>In Hell</h3>
            <span>2003</span>
            <FaStar />
            <span className="text-xs line-clamp-3 ">
              A man must survive a prison where hardened criminals battle to the
              death for the warden's entertainment.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
