import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useFetchSearchResults from "../features/search/hooks/useFetchSearchResults";
import SearchResultMovieCard from "../features/search/components/SearchResultMovieCard";
import ErrorSign from "../assets/images/SearchResultErrorSign.png";
import EmptySign from "../assets/images/reel.png";
import SectionState from "../components/ui/SectionState";
const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { name, page = 1 } = Object.fromEntries(searchParams);

  const { results, isLoading, isError, refetch } = useFetchSearchResults(
    name,
    page,
  );

  useEffect(() => {
    if (!results && !isLoading) navigate("/");
  }, [results, isLoading]);

  if (!results) return null;

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

  if (isError)
    return (
      <div className="my-15">
        <SectionState
          imageSource={ErrorSign}
          buttonText="Retry"
          message="Something went wrong"
          description={`Couldn't load result for ${name} please try again later`}
          onRetry={refetch}
        />
      </div>
    );

  const { movies, total_results } = results;

  if (movies.length === 0)
    return (
      <div className="my-15">
        <SectionState
          imageSource={EmptySign}
          message={`No results for "${name}"`}
          description="Try checking your spelling or use less specific keywords."
        />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 justify-evenly px-40 py-5 bg-gray-100">
      <span className="text-2xl font-poppins font-bold">
        Results for <span className="text-accent">"{name}"</span>
      </span>
      <span className="text-gray-500">
        {total_results} {total_results > 1 ? "results" : "result"} found
      </span>
      {movies.map((movie) => (
        <SearchResultMovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default SearchResults;
