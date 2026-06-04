import React, { useEffect, useState } from "react";
import HomeMovieSection from "../components/HomeMovieSection";
import ErrorToast from "../components/ErrorToast";
import heroImg from "../assets/images/hero.png";
import Footer from "../components/Footer";
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
      <div
        className=" h-90 mx-5 my-2.5 py-5 px-8 rounded-xl bg-cover text-white flex relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="z-3 h-full flex flex-col justify-between ">
          <div className="text-6xl font-bold font-poppins ">
            <h1>Track Movies.</h1>
            <h1>Build Your Watchlist.</h1>
            <h1>
              <span className="text-accent">Rate and Review </span>Films.
            </h1>
          </div>
          <div className="font-inter text-xl  text-[#D1D5DB]">
            <p>Discover movies, save what you want to watch,</p>
            <p>keep track of everything you've seen</p>
          </div>
          <button className="bg-accent px-12 py-2 rounded-xl self-start cursor-pointer transition-all duration-300 hover:bg-[#B8860B]">
            Get Started
          </button>
        </div>

        <div
          className="absolute inset-0 z-1 rounded-xl"
          style={{
            background: `linear-gradient(to right,rgba(0,0,0,1) 35%,rgba(0,0,0,0.3) 100%)`,
          }}
        ></div>
      </div>
      <HomeMovieSection
        title="Trending Movies"
        movies={trendingMovies}
        isLoading={isTrendingLoading}
        errorMessage={trendingError}
      />

      <HomeMovieSection
        title="Top Rated Movies"
        movies={topRatedMovies}
        isLoading={isTopRatedLoading}
        errorMessage={topRatedError}
      />
      <Footer />
    </>
  );
};

export default Home;
