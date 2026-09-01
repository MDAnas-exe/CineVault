import SearchBar from "./SearchBar";
import useAuth from "../../../hooks/useAuth";
import UserMenuLinks from "./UserMenuLinks";
import UserInfoHeader from "./UserInfoHeader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import { FaChevronDown } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import Skeleton from "react-loading-skeleton";
import { MdOutlinePersonOutline } from "react-icons/md";
import LogoutButton from "./LogoutButton";
import {
  PRIMARY_USER_MENU_LINKS,
  USER_MENU_LINKS,
} from "./userMenuConfig";

const DesktopNavbar = () => {
  const { isLoading, isLoggedIn, user } = useAuth();
  const location = useLocation();

  const name = user?.name;
  const email = user?.email;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeDropdown = () => setIsOpen(false);
    window.addEventListener("scroll", closeDropdown);
    return () => window.removeEventListener("scroll", closeDropdown);
  }, [isOpen]);

  return (
    <>
      <Link to="/" className="hidden md:block">
        <Logo />
      </Link>
      <SearchBar className="hidden md:flex" />

      {!isLoading && !isLoggedIn && (
        <Link
          to="/signup"
          className="hidden cursor-pointer items-center gap-2 rounded-xl border border-accent px-4 py-1.5 font-inter text-sm font-medium text-accent transition-all duration-500 hover:bg-accent hover:text-white md:flex md:px-5"
        >
          <MdOutlinePersonOutline className="text-xl" />
          Sign Up
        </Link>
      )}

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
          {PRIMARY_USER_MENU_LINKS.map(({ to, label, preserveQuery }) => (
            <NavLink
              key={to}
              to={preserveQuery ? to + location.search : to}
              className={({ isActive }) =>
                twMerge(
                  "hidden rounded-lg px-3 py-2 font-inter text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 lg:block lg:text-base",
                  isActive &&
                    "text-accent relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent",
                )
              }
            >
              <UserMenuLinks label={label} />
            </NavLink>
          ))}
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className={`relative z-50 hidden items-center gap-1.5 rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-primary hover:bg-gray-100 hover:text-primary active:scale-100 md:flex md:text-base ${isOpen && "ring-2 ring-accent/40"}`}
          >
            <span>{name.split(" ")[name.split(" ").length - 1]}</span>

            <FaChevronDown
              size={16}
              strokeWidth={2.2}
              className="text-gray-700"
            />
          </Button>
          <div
            className={twMerge(
              "absolute size-0 inset-0 bg-transparent",
              isOpen && "h-screen w-full",
            )}
            onClick={() => setIsOpen(false)}
          ></div>
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
              {USER_MENU_LINKS.map(({ to, label, className, preserveQuery }) => (
                <NavLink
                  key={to}
                  to={preserveQuery ? to + location.search : to}
                  className={({ isActive }) =>
                    twMerge(
                      "block px-4 py-3 font-inter text-primary transition-colors duration-200 hover:bg-gray-100 text-left",
                      isActive && "text-accent bg-amber-50",
                      className,
                    )
                  }
                >
                  <UserMenuLinks label={label} />
                </NavLink>
              ))}
            </div>

            <div className="border-t border-gray-200 ">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DesktopNavbar;
