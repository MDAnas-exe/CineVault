import HomeMovieSection from "../features/home/components/MovieSection";
import heroImg from "../assets/images/hero.avif";
import useAuth from "../hooks/useAuth.js";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Home = () => {
  const { isLoading, isLoggedIn } = useAuth();

  return (
    <>
      <div
        className="md:h-70 lg:h-90 mx-2 md:mx-5 my-2.5 px-3 py-2 md:py-5 md:px-8 rounded-xl bg-cover bg-center text-white flex relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="z-3 h-full flex flex-col md:justify-between md:gap-0 gap-2">
          <div className="md:text-3xl lg:text-6xl font-bold font-poppins ">
            <h1>Track Movies.</h1>
            <h1>Build Your Watchlist.</h1>
            <h1>
              <span className="text-accent">Rate and Review </span>Films.
            </h1>
          </div>
          <div className="font-inter text-xs md:text-base lg:text-xl  text-[#D1D5DB]">
            <p>Discover movies, save what you want to watch,</p>
            <p>keep track of everything you've seen</p>
          </div>
          {!isLoggedIn && !isLoading && (
            <Link
              to="/signup"
              className="bg-accent text-xs md:text-base p-2 md:px-12 md:py-2 rounded-xl self-start cursor-pointer transition-all duration-300 hover:bg-accent-hover"
            >
              Get Started
            </Link>
          )}

          {isLoading && <Skeleton width={120} height={40} baseColor="black" />}

          {isLoggedIn && (
            <a
              href="#movie-sections"
              className="bg-accent text-xs md:text-base p-2 md:px-12 md:py-2 rounded-xl self-start cursor-pointer transition-all duration-300 hover:bg-accent-hover"
            >
              Browse Movies
            </a>
          )}
        </div>

        <div
          className="absolute inset-0 z-1 rounded-xl"
          style={{
            background: `linear-gradient(to right,rgba(0,0,0,1) 35%,rgba(0,0,0,0.3) 100%)`,
          }}
        ></div>
      </div>
      <div id="movie-sections">
        <HomeMovieSection title="Trending Movies" endpoint="trending" />
        <HomeMovieSection title="Top Rated Movies" endpoint="top_rated" />
      </div>
    </>
  );
};

export default Home;
