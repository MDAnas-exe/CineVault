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
import { NavLink, useLocation } from "react-router-dom";
import UserMenuLinks from "./UserMenuLinks";
import { twMerge } from "tailwind-merge";
import Button from "../../ui/Button";
import LogoutButton from "./LogoutButton";
import { USER_MENU_LINKS } from "./userMenuConfig";
const MobileNavbar = () => {
  const { isLoading, isLoggedIn, user } = useAuth();
  const location = useLocation();
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
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-accent px-3 py-1.5 font-inter text-sm font-medium text-accent transition-all duration-500 hover:bg-accent hover:text-white md:hidden"
        >
          <MdOutlinePersonOutline className="text-xl" />
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
            className="bg-transparent p-1"
          >
            <GiHamburgerMenu className="size-6" />
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
              className="bg-transparent self-end p-0"
            >
              <IoClose className="size-6" />
            </Button>

            <UserInfoHeader name={name} email={email} className="pt-0" />
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
                onClick={() => setIsOpen(false)}
              >
                <UserMenuLinks label={label} />
              </NavLink>
            ))}
            <LogoutButton className="rounded-none shadow-white" />
          </div>
        </div>
      )}

      <SearchBar className="mt-2 flex w-full bg-gray-100 md:hidden" />
    </>
  );
};
export default MobileNavbar;
