import React, { useEffect, useState } from "react";
import HomeMovieSection from "../components/HomeMovieSection";
import ErrorToast from "../components/ErrorToast";
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchHomeMovies = async () => {
      try {
        const results = await Promise.allSettled([
          fetch("http://localhost:3000/movies/trending"),
          fetch("http://localhost:3000/movies/top_rated"),
        ]);
      } catch (error) {}
    };

    fetchHomeMovies();
  }, []);

  return (
    <>
      <HomeMovieSection />
    </>
  );
};

export default Home;
