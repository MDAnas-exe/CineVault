import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate();
  const searchMovies = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value.trim()) return;
      const encodedMovieName = encodeURIComponent(e.target.value.trim());
      navigate(`/search?name=${encodedMovieName}`);
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
