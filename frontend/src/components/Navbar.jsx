import React, { useContext } from "react";
import { movieSearchResult } from "../context/MovieSearchResultContext";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  const { setMovies } = useContext(movieSearchResult);

  const searchMovies = async (e) => {
    if (e.key === "Enter") {
      try {
        const encodedMovieName = encodeURIComponent(e.target.value);

        let response = await fetch(
          `http://localhost:3000/movies?name=${encodedMovieName}&include_adult=false&language=en-US&page=1`,
        );
        let result = await response.json();
        setMovies(result.results);
      } catch (error) {}
    }
  };

  return (
    <nav className="flex justify-between px-2 md:px-5">
      <div className="logo">CineVault</div>

      <div className="hidden md:flex gap-4 items-center">
        <span>Movies</span>
        <span>Watchlist</span>
        <span>History</span>
      </div>
      <div className="hidden md:flex gap-4 items-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Movies"
            onKeyDown={searchMovies}
            className="outline-0"
          />
          <FaSearch />
        </div>
        <span>SignIn</span>
      </div>

      <div className="hamMenu md:hidden">
        <input type="text" placeholder="Search Movies" />
        <div>Movies</div>
        <div>Watchlist</div>
        <div>History</div>
        <div>SignIn</div>
      </div>
    </nav>
  );
};

export default Navbar;
