import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { movieSearchResult } from "../context/MovieSearchResultContext";
import SearchResultMovieCard from "./SearchResultMovieCard";
const SearchResults = () => {
  let {
    movies,
    setMovies,
    isSearchLoading,
    setSearchLoadingStatus,
    hasSearched,
    setHasSearched,
    searchResultError,
    setSearchResultError,
  } = useContext(movieSearchResult);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setMovies([]);
        setHasSearched(false);
        setSearchResultError(false);
        setSearchLoadingStatus(false);
        return;
      }

      try {
        const encodedMovieName = encodeURIComponent(query.trim());
        setSearchLoadingStatus(true);
        setHasSearched(true);
        setSearchResultError(false);
        let response = await fetch(
          `http://localhost:3000/movies?name=${encodedMovieName}&include_adult=false&language=en-US&page=1`,
        );

        if (!response.ok) throw new Error("Failed to fetch movies");

        let result = await response.json();
        setMovies(result.results);
      } catch {
        setMovies([]);
        setSearchResultError(true);
      } finally {
        setSearchLoadingStatus(false);
      }
    };

    searchMovies();
  }, [
    query,
    setHasSearched,
    setMovies,
    setSearchLoadingStatus,
    setSearchResultError,
  ]);

  useEffect(() => {
    if (searchResultError) {
      const timer = setTimeout(() => {
        setSearchResultError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchResultError, setSearchResultError]);

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
  const errorToast = searchResultError ? (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl">
      Something went wrong while searching movies. Please try again.
    </div>
  ) : null;

  if (!movies || (movies.length === 0 && hasSearched === false)) {
    return errorToast;
  }

  let filteredMovies = movies.filter(
    (movie) =>
      movie.id && movie.title && (movie.poster_path || movie.backdrop_path),
  );
  if (filteredMovies.length === 0 && searchResultError) return errorToast;

  if (filteredMovies.length === 0 && hasSearched && !searchResultError)
    return <div>No Movies Found</div>;

  return (
    <div className="bg-gray-300 p-3 flex flex-wrap gap-2 justify-evenly">
      {filteredMovies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default SearchResults;
