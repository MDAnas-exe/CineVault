import React, { useContext } from "react";
import { movieSearchResult } from "../context/MovieSearchResultContext";
import { FaStar } from "react-icons/fa";
const MovieCard = () => {
  let { movies } = useContext(movieSearchResult);

  if (!movies || movies.length === 0) return null;
  movies = movies.map((movie) => ({
    ...movie,
    vote_average: (movie.vote_average / 10) * 5,
  }));

  return (
    <>
      <div className="bg-gray-300 p-3 flex flex-wrap gap-2 justify-evenly">
        {movies.map((movie) => (
          <div
            className="flex px-5 py-3 w-1/4 h-52 gap-1 border rounded-xl bg-white hover:scale-110 transition-all duration-500 cursor-pointer"
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt=""
              className="w-1/3 rounded-xl my-3"
            />
            <div className=" py-3">
              <h3>{movie.title}</h3>
              <span>{movie.release_date.split("-")[0]}</span>
              <div className="flex">
                {Array.from({ length: movie.vote_average }).map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <span className="text-xs line-clamp-3 ">{movie.overview}</span>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="bg-gray-300 p-3">
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
      </div> */}
    </>
  );
};

export default MovieCard;
