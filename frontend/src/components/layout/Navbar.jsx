import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { PiFilmReelFill } from "react-icons/pi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlinePersonOutline } from "react-icons/md";
const Navbar = () => {
  const navigate = useNavigate();
  const searchMovies = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value.trim()) {
        navigate("/");
        return;
      }
      const encodedMovieName = encodeURIComponent(e.target.value.trim());
      navigate(`/search?name=${encodedMovieName}`);
    }
  };

  return (
    <nav className=" flex justify-between items-center p-2 md:px-5 md:py-2.5 flex-wrap border-b border-gray-200 sticky top-0 bg-white z-50">
      <Link
        to="/"
        className="logo flex items-center gap-0.5 lg:text-3xl md:text-2xl cursor-pointer"
      >
        <PiFilmReelFill fill="#d4a017" />
        <span className="font-bold font-poppins ">
          <span className=" text-primary">Cine</span>
          <span className="text-accent">Vault</span>
        </span>
      </Link>
      <div className="bg-white w-2/5 outline-1 outline-gray-300 rounded-xl p-2 relative hover:outline-accent focus-within:outline-accent transition-all duration-500 hidden md:block">
        <FaSearch className="absolute top-3.5 text-sm text-gray-400" />
        <input
          type="text"
          placeholder="Search Movies..."
          className="w-full ml-5 placeholder:text-gray-400 placeholder:text-sm font-inter font-medium text-primary outline-0"
          onKeyDown={searchMovies}
        />
      </div>

      <span className="flex items-center gap-2 px-2 md:px-6 py-1 border border-accent rounded-xl text-xs md:text-sm text-accent font-inter font-medium cursor-pointer transition-all duration-500 hover:bg-accent hover:text-white">
        <MdOutlinePersonOutline className=" md:text-2xl" />
        Sign In
      </span>
      <div className="w-full flex outline-1 outline-gray-300 rounded-xl items-center mt-2 p-1 bg-gray-100 md:hidden">
        <FaSearch className="text-gray-400 text-sm " />
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full ml-1 outline-0 placeholder:text-xs  font-inter font-medium text-primary text-sm"
        />
      </div>
    </nav>
  );
};

export default Navbar;
