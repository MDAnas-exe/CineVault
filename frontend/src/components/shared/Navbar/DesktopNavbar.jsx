import SearchBar from "./SearchBar";
import useAuth from "../../../hooks/useAuth";
import UserMenuLinks from "./UserMenuLinks";
import UserInfoHeader from "./UserInfoHeader";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button";
import { FaChevronDown } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { IoExitOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
const DesktopNavbar = () => {
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

  const name = user?.name;
  const email = user?.email;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link to="/" className="hidden md:block">
        <Logo />
      </Link>
      <SearchBar />
      {isLoading && (
        <div className="hidden lg:flex items-center gap-10 ">
          <Skeleton width={72} height={24} />
          <Skeleton width={72} height={24} />
          <Skeleton width={72} height={24} />
        </div>
      )}

      {isLoading && (
        <div className="w-20 lg:hidden  ">
          <Skeleton width="100%" height={24} />
        </div>
      )}
      {isLoggedIn && (
        <div className="hidden md:flex gap-5 items-center">
          {[
            { to: "/users/watched", label: "Watched" },
            { to: "/users/watchlist", label: "Watchlist" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                twMerge(
                  "hidden lg:block rounded-lg px-3 py-2 font-inter font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
                  isActive &&
                    "text-accent relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent",
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className="hidden md:flex relative h-auto w-auto items-center gap-1.5 rounded-lg bg-transparent px-3 py-2 font-medium text-primary shadow-none hover:bg-gray-100 hover:text-primary focus:ring-accent/40 active:scale-100"
          >
            <span>{name.split(" ")[name.split(" ").length - 1]}</span>

            <FaChevronDown
              size={14}
              strokeWidth={2.2}
              className="text-gray-700"
            />
          </Button>
          <div
            className={twMerge(
              "  absolute right-4 top-full mt-3 w-60 rounded-2xl before:absolute before:-top-2 before:right-8 before:h-4 before:w-4 before:rotate-45 before:border-l before:border-t before:border-gray-200 before:bg-white before:content-[''] origin-top-right border border-gray-200 bg-white shadow-xl transition-all duration-200 ease-out",
              isOpen
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
            )}
          >
            <UserInfoHeader name={name} email={email} />

            <div>
              {userMenuLinks.map(({ to, label, className }) => (
                <UserMenuLinks
                  to={to}
                  label={label}
                  key={to}
                  className={className}
                />
              ))}
            </div>

            <div className="border-t border-gray-200 ">
              <button
                type="button"
                className="w-full cursor-pointer rounded-b-2xl px-4 py-3 text-left font-inter text-red-600 transition-colors duration-200 hover:bg-red-50 flex gap-2 items-center"
              >
                <IoExitOutline />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DesktopNavbar;
