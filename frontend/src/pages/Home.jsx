import React, { useEffect, useState } from "react";
import HomeMovieSection from "../components/HomeMovieSection";
import ErrorToast from "../components/ErrorToast";
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [isTopRatedLoading, setIsTopRatedLoading] = useState(false);

  const [trendingError, setTrendingError] = useState("");
  const [topRatedError, setTopRatedError] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsTrendingLoading(true);
        setTrendingError("");

        const response = await fetch("http://localhost:3000/movies/trending");

        if (!response.ok) {
          throw new Error("Failed to fetch trending movies");
        }

        const data = await response.json();
        let movies = data.results;
        movies = movies.filter(
          (m) => m.id && (m.poster_path || m.backdrop_path),
        );
        if (movies.length === 0)
          throw new Error("Failed to fetch trending movies");
        setTrendingMovies(movies);
      } catch (error) {
        setTrendingMovies([]);
        setTrendingError(error.message);
      } finally {
        setIsTrendingLoading(false);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        setIsTopRatedLoading(true);
        setTopRatedError("");

        const response = await fetch("http://localhost:3000/movies/top_rated");

        if (!response.ok) {
          throw new Error("Failed to fetch top rated movies");
        }

        const data = await response.json();
        let movies = data.results;
        movies = movies.filter(
          (m) => m.id && (m.poster_path || m.backdrop_path),
        );
        if (movies.length === 0)
          throw new Error("Failed to fetch trending movies");
        setTopRatedMovies(movies);
      } catch (error) {
        setTopRatedMovies([]);
        setTopRatedError(error.message);
      } finally {
        setIsTopRatedLoading(false);
      }
    };

    fetchTrendingMovies();
    fetchTopRatedMovies();
  }, []);

  return (
    <>
      <HomeMovieSection
        title="Trending"
        movies={trendingMovies}
        isLoading={isTrendingLoading}
        errorMessage={trendingError}
      />

      <HomeMovieSection
        title="Top Rated"
        movies={topRatedMovies}
        isLoading={isTopRatedLoading}
        errorMessage={topRatedError}
      />
    </>
  );
};

export default Home;
