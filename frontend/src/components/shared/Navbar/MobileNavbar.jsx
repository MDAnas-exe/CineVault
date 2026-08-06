import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import SearchBar from "./SearchBar";
import { MdOutlinePersonOutline } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
const MobileNavbar = () => {
  const { isLoading, isLoggedIn, user } = useAuth();

  const name = user?.name;
  const email = user?.email;

  return (
    <>
      <Link to="/" className="md:hidden">
        <Logo />
      </Link>

      {!isLoading && !isLoggedIn && (
        <Link
          to="/signup"
          className="flex md:hidden items-center gap-2 px-2 md:px-6 py-1 border border-accent rounded-xl text-xs md:text-sm text-accent font-inter font-medium cursor-pointer transition-all duration-500 hover:bg-accent hover:text-white"
        >
          <MdOutlinePersonOutline className=" md:text-2xl" />
          Sign Up
        </Link>
      )}

      {isLoading && (
        <div className="w-8 lg:hidden  ">
          <Skeleton width="100%" height={24} />
        </div>
      )}

      {isLoggedIn && (
        <div className="md:hidden">
          <GiHamburgerMenu />
          <div className="absolute z-50 h-screen w-80 right-0 top-0 flex flex-col pr-2 pt-2.5 bg-white">
            <IoClose className="self-end" />
          </div>
        </div>
      )}

      <SearchBar className="flex md:hidden w-full bg-gray-100 p-1 mt-2" />
    </>
  );
};
export default MobileNavbar;
