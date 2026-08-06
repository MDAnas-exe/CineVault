import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import SearchBar from "./SearchBar";
import UserInfoHeader from "./UserInfoHeader";
import { MdOutlinePersonOutline } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import UserMenuLinks from "./UserMenuLinks";
import { twMerge } from "tailwind-merge";
import Button from "../../ui/Button";

const MobileNavbar = () => {
  const userMenuLinks = [
    {
      to: "/users/profile",
      label: "View Profile",
    },
    {
      to: "/users/watched",
      label: "Watched Movies",
      className: "block lg:hidden",
    },
    {
      to: "/users/watchlist",
      label: "Watchlist",
      className: "block lg:hidden",
    },
    {
      to: "/users/liked",
      label: "Liked Movies",
    },
    {
      to: "/users/reviews",
      label: "Reviews",
    },
  ];

  const { isLoading, isLoggedIn, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const name = user?.name;
  const email = user?.email;

  useEffect(() => {
    if (isOpen) document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

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
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-auto bg-white shadow-white"
          >
            <GiHamburgerMenu />
          </Button>
          <div
            className={`fixed  h-screen w-full  -right-full top-0 transition-all duration-500 ${isOpen && "right-0"}`}
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className={`fixed z-50 h-screen w-full xs:w-80 -right-full top-0 flex flex-col pr-2 pt-2.5 bg-white transition-all duration-500 ${isOpen && "right-0"}`}
          >
            <Button
              onClick={() => setIsOpen((prev) => !prev)}
              className="h-auto w-auto bg-white shadow-white self-end p-0"
            >
              <IoClose className="size-6" />
            </Button>

            <UserInfoHeader name={name} email={email} className="pt-0" />
            {userMenuLinks.map(({ to, label, className }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  twMerge(
                    "block px-4 py-3 font-inter text-primary transition-colors duration-200 hover:bg-gray-100 text-left",
                    isActive && "text-accent bg-amber-50",
                    className,
                  )
                }
                onClick={() => setIsOpen(false)}
              >
                <UserMenuLinks label={label} />
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <SearchBar className="flex md:hidden w-full bg-gray-100 p-1 mt-2" />
    </>
  );
};
export default MobileNavbar;
