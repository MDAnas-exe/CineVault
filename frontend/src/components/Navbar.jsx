import React, { useState } from "react";

const Navbar = () => {
  const [movies, setMovies] = useState([]);
  const [movieSearchResult, setMovieSearchResult] = useState([]);
  const handleSearch = (e) => {
    if (e.key == "Enter") console.log("i was pressed");
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
        <input
          type="text"
          placeholder="Search Movies"
          onKeyDown={handleSearch}
        />
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
