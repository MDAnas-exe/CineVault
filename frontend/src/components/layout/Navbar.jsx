import { useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import Logo from "../ui/Logo";
import AppLink from "../ui/AppLink.jsx";
import useAuth from "../../hooks/useAuth.js";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoading, user, isLoggedIn } = useAuth();

  console.log(isLoading, user, isLoggedIn);

  const ref = useRef(null);
  const ref2 = useRef(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("name")) ref.current.value = searchParams.get("name");
    else ref.current.value = "";
  }, [searchParams]);

  const searchMovies = (e, ref) => {
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
    <nav className=" flex justify-between items-center p-2 md:px-5 md:py-2.5 flex-wrap border-b border-gray-200 sticky top-0 bg-white z-50">
      <AppLink to="/">
        <Logo />
      </AppLink>

      <div className="bg-white w-2/5 outline-1 outline-gray-300 rounded-xl p-2 relative hover:outline-accent focus-within:outline-accent transition-all duration-500 hidden md:block">
        <FaSearch
          className="absolute top-3.5 text-sm text-gray-400 cursor-pointer"
          onClick={(e) => searchMovies(e, ref)}
        />
        <input
          type="text"
          placeholder="Search Movies..."
          enterKeyHint="search"
          className="w-full ml-5 placeholder:text-gray-400 placeholder:text-sm font-inter font-medium text-primary outline-0"
          onKeyDown={(e) => searchMovies(e, ref)}
          ref={ref}
        />
      </div>

      <AppLink
        to="/signup"
        className="flex items-center gap-2 px-2 md:px-6 py-1 border border-accent rounded-xl text-xs md:text-sm text-accent font-inter font-medium cursor-pointer transition-all duration-500 hover:bg-accent hover:text-white"
      >
        <MdOutlinePersonOutline className=" md:text-2xl" />
        Sign Up
      </AppLink>

      <div className="w-full flex outline-1 outline-gray-300 rounded-xl items-center mt-2 p-1 bg-gray-100 md:hidden">
        <FaSearch
          className="text-gray-400 text-sm "
          onClick={(e) => searchMovies(e, ref2)}
        />
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full ml-1 outline-0 placeholder:text-xs  font-inter font-medium text-primary text-sm"
          enterKeyHint="search"
          ref={ref2}
          onKeyDown={(e) => searchMovies(e, ref2)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
