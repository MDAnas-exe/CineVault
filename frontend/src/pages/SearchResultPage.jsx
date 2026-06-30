import React from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useFetchSearchResults from "../features/search/hooks/useFetchSearchResults";
import SearchResultMovieCard from "../features/search/components/SearchResultMovieCard";
import ErrorSign from "../assets/images/SearchResultErrorSign.png";
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { name, page = 1 } = Object.fromEntries(searchParams);

  const { results, isLoading, isError } = useFetchSearchResults(name, page);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 justify-evenly px-40 py-5 bg-gray-100">
        <Skeleton width="30%" height={30} />
        <Skeleton width="15%" height={20} />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="flex gap-6 p-6 rounded-2xl bg-white border border-gray-200/60 shadow-sm"
            key={index}
          >
            <div className="w-37.5 h-50">
              <Skeleton height="100%" width="100%" borderRadius="0.75rem" />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div className="flex items-center gap-4">
                <Skeleton width={260} height={32} />
                <Skeleton width={70} height={24} />
                <Skeleton width={50} height={20} />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton width={90} height={16} />
                <Skeleton width={70} height={16} />
              </div>
              <div className="w-125">
                <Skeleton count={2} />
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center">
                <Skeleton width={140} height={22} />
                <div className="flex items-center gap-3">
                  <Skeleton circle width={28} height={28} />
                  <Skeleton circle width={28} height={28} />
                  <Skeleton circle width={28} height={28} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (true) return <div>Error</div>;

  const { movies, total_results } = results;
  console.log(results);
  const filteredMovies = movies.filter(
    (m) => m.id && (m.poster_path || m.backdrop_path),
  );
  if (movies.length === 0)
    return <div className="p-10 text-center">No Movies Found for "{name}"</div>;

  return (
    <div className="flex flex-col gap-2 justify-evenly px-40 py-5 bg-gray-100">
      <span className="text-2xl font-poppins font-bold">
        Results for <span className="text-accent">"{name}"</span>
      </span>
      <span className="text-gray-500">
        {total_results} {total_results > 1 ? "results" : "result"} found
      </span>
      {filteredMovies.map((movie) => (
        <SearchResultMovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default SearchResults;
