import React from "react";
import { useNavigate } from "react-router-dom";
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
    <nav className="flex justify-between items-center p-2 md:px-5 py-2.5 ">
      <div className="logo flex items-center gap-0.5 text-2xl md:text-3xl cursor-pointer">
        <PiFilmReelFill fill="#d4a017" />
        <span className="font-bold font-poppins ">
          <span className=" text-primary">Cine</span>
          <span className="text-accent">Vault</span>
        </span>
      </div>
      <div className="w-1/4 outline-1 outline-gray-300 rounded-xl p-2 relative hover:outline-accent focus-within:outline-accent transition-all duration-500">
        <FaSearch className="absolute top-3.5 text-sm text-gray-400" />
        <input
          type="text"
          placeholder="Search Movies..."
          className="w-full ml-5 placeholder:text-gray-400 placeholder:text-sm font-inter font-medium text-[111827] outline-0"
          onKeyDown={searchMovies}
        />
      </div>
      <div className="font-inter font-semibold text-primary flex gap-8 items-center">
        <span className="cursor-pointer hover:text-accent transition-all duration-500 flex items-center gap-2">
          <FaRegBookmark />
          Watchlist
        </span>
        <span className="cursor-pointer hover:text-accent transition-all duration-500 flex items-center gap-2">
          <FaClockRotateLeft />
          History
        </span>
        <span className="font-medium border border-accent  px-6 py-1 rounded-xl text-accent cursor-pointer hover:bg-accent hover:text-white transition-all duration-500 flex items-center gap-2">
          <MdOutlinePersonOutline className="text-2xl" />
          Sign In
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
