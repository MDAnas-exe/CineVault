import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { movieSearchResult } from "../context/MovieSearchResultContext";
import { SearchLoadingContext } from "../context/SearchLoading";
import { FaStar } from "react-icons/fa";
const MovieCard = () => {
  let { movies } = useContext(movieSearchResult);
  let { isSearchLoading } = useContext(SearchLoadingContext);

  if (isSearchLoading) {
    return (
      <div className="bg-gray-300 p-3 flex flex-wrap gap-2 justify-evenly">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="flex px-5 py-3 w-1/4 h-52 gap-1 border rounded-xl bg-white"
            key={index}
          >
            <div className="w-1/3 my-3">
              <Skeleton
                height="100%"
                style={{ minHeight: "160px" }}
                borderRadius="0.75rem"
              />
            </div>
            <div className="w-2/3 py-3 pl-2 flex flex-col overflow-hidden">
              <h3>
                <Skeleton width="80%" />
              </h3>
              <span className="block mt-1">
                <Skeleton width="30%" />
              </span>
              <div className="flex my-1">
                <Skeleton width={60} />
              </div>
              <span className="text-xs mt-1">
                <Skeleton count={3} />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) return null;
  console.log(movies);

  movies = movies.filter(
    (movie) =>
      movie.id && movie.title && (movie.poster_path || movie.backdrop_path),
  );
  return (
    <>
      <div className="bg-gray-300 p-3 flex flex-wrap gap-2 justify-evenly">
        {movies.map((movie) => (
          <div
            className="flex px-5 py-3 w-1/4 h-52 gap-1 border rounded-xl bg-white hover:scale-110 transition-all duration-500 cursor-pointer"
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path || movie.backdrop_path}`}
              alt=""
              className="w-1/3 rounded-xl my-3"
            />
            <div className=" py-3">
              <h3>{movie.title}</h3>
              <span>{movie.release_date.split("-")[0]}</span>
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
        ))}
      </div>
    </>
  );
};

export default MovieCard;
