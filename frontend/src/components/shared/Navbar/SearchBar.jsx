import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ className = "" }) => {
  const ref = useRef(null);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (searchParams.has("name")) ref.current.value = searchParams.get("name");
    else ref.current.value = "";
  }, [searchParams]);

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
        "relative items-center rounded-xl bg-white p-2 outline-1 outline-gray-300 transition-all duration-500 hover:outline-accent focus-within:outline-accent md:w-2/5 md:p-2.5",
        className,
      )}
    >
      <FaSearch
        className="cursor-pointer text-base text-gray-400 sm:text-lg"
        onClick={(e) => searchMovies(e)}
      />
      <input
        type="text"
        placeholder="Search Movies..."
        enterKeyHint="search"
        className="ml-2 w-full font-inter text-sm font-medium text-primary outline-0 placeholder:text-sm placeholder:text-gray-400 sm:text-base sm:placeholder:text-base"
        onKeyDown={(e) => searchMovies(e)}
        ref={ref}
      />
    </div>
  );
};
export default SearchBar;
