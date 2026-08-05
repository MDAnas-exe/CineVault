import Skeleton from "react-loading-skeleton";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const SearchBar = ({ className = "" }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const searchMovies = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!ref.current.value.trim()) {
        navigate("/");
        return;
      }

      const encodedMovieName = encodeURIComponent(ref.current.value.trim());
      navigate(`/search?name=${encodedMovieName}`);
    }
  };

  return (
    <div
      className={twMerge(
        "bg-white  md:w-2/5 outline-1 outline-gray-300 rounded-xl p-2 relative hover:outline-accent focus-within:outline-accent transition-all duration-500  items-center",
        className,
      )}
    >
      <FaSearch
        className=" text-sm text-gray-400 cursor-pointer"
        onClick={(e) => searchMovies(e)}
      />
      <input
        type="text"
        placeholder="Search Movies..."
        enterKeyHint="search"
        className="w-full ml-2 placeholder:text-gray-400 placeholder:text-sm font-inter font-medium text-primary outline-0 "
        onKeyDown={(e) => searchMovies(e)}
        ref={ref}
      />
    </div>
  );
};
export default SearchBar;
