import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorToast from "./ErrorToast";
import SearchResultMovieCard from "./SearchResultMovieCard";
const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [isSearchLoading, setSearchLoadingStatus] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResultErrorMessage, setSearchResultErrorMessage] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setMovies([]);
        setHasSearched(false);
        setSearchResultErrorMessage("");
        setSearchLoadingStatus(false);
        return;
      }

      try {
        const encodedMovieName = encodeURIComponent(query.trim());
        setSearchLoadingStatus(true);
        setHasSearched(true);
        setSearchResultErrorMessage("");
        let response = await fetch(
          `http://localhost:3000/movies/search?name=${encodedMovieName}&include_adult=false&language=en-US&page=1`,
        );

        if (!response.ok) throw new Error("Failed to fetch movies");

        let result = await response.json();
        setMovies(result.results);
      } catch (error) {
        setMovies([]);
        setSearchResultErrorMessage(error.message);
      } finally {
        setSearchLoadingStatus(false);
      }
    };

    searchMovies();
  }, [query]);

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

  if (searchResultErrorMessage)
    return <ErrorToast message={searchResultErrorMessage} />;

  if (!hasSearched) {
    return null;
  }
  let filteredMovies = movies.filter(
    (movie) =>
      movie.id && movie.title && (movie.poster_path || movie.backdrop_path),
  );

  if (filteredMovies.length === 0 && hasSearched && !searchResultErrorMessage)
    return <div>No Movies Found</div>;

  return (
    <div className="bg-gray-300 p-3 flex flex-wrap gap-2 justify-evenly">
      {filteredMovies.map((movie) => (
        <SearchResultMovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default SearchResults;
