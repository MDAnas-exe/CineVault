// import { useRef, useEffect, useState } from "react";
// import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { MdOutlinePersonOutline } from "react-icons/md";
// import Logo from "../../ui/Logo.jsx";
// import useAuth from "../../../hooks/useAuth.js";
// import Skeleton from "react-loading-skeleton";
// import Button from "../../ui/Button.jsx";
// import { FaChevronDown } from "react-icons/fa";
// import { twMerge } from "tailwind-merge";
// import { IoExitOutline } from "react-icons/io5";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);

//   const { isLoading, isLoggedIn, user } = useAuth();

//   const name = user?.name;
//   const email = user?.email;

//   const ref = useRef(null);
//   const ref2 = useRef(null);

//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     if (searchParams.has("name")) ref.current.value = searchParams.get("name");
//     else ref.current.value = "";
//   }, [searchParams]);

//   const searchMovies = (e, ref) => {
//     if (e.key === "Enter" || e.type === "click") {
//       if (!ref.current.value.trim()) {
//         navigate("/");
//         return;
//       }

//       const encodedMovieName = encodeURIComponent(ref.current.value.trim());
//       navigate(`/search?name=${encodedMovieName}`);
//     }
//   };

//   return (
//     <nav className=" flex justify-between items-center p-2 md:px-5 md:py-2.5 md:flex-nowrap flex-wrap border-b border-gray-200 sticky top-0 bg-white z-50">
//       <Link to="/">
//         <Logo />
//       </Link>

//       <div className="bg-white mx-auto w-2/5 outline-1 outline-gray-300 rounded-xl p-2 relative hover:outline-accent focus-within:outline-accent transition-all duration-500 hidden md:flex items-center">
//         <FaSearch
//           className=" text-sm text-gray-400 cursor-pointer"
//           onClick={(e) => searchMovies(e, ref)}
//         />
//         <input
//           type="text"
//           placeholder="Search Movies..."
//           enterKeyHint="search"
//           className="w-full ml-2 placeholder:text-gray-400 placeholder:text-sm font-inter font-medium text-primary outline-0"
//           onKeyDown={(e) => searchMovies(e, ref)}
//           ref={ref}
//         />
//       </div>

//       {!isLoggedIn && !isLoading && (
//         <Link
//           to="/signup"
//           className="flex items-center gap-2 px-2 md:px-6 py-1 border border-accent rounded-xl text-xs md:text-sm text-accent font-inter font-medium cursor-pointer transition-all duration-500 hover:bg-accent hover:text-white"
//         >
//           <MdOutlinePersonOutline className=" md:text-2xl" />
//           Sign Up
//         </Link>
//       )}

//       {isLoading && (
//         <div className="hidden lg:flex items-center gap-10 ">
//           <Skeleton width={72} height={24} />
//           <Skeleton width={72} height={24} />
//           <Skeleton width={72} height={24} />
//         </div>
//       )}

//       {isLoading && (
//         <div className="w-20 lg:hidden  ">
//           <Skeleton width="100%" height={24} />
//         </div>
//       )}

//       {isLoggedIn && (
//         <div className="hidden md:flex gap-15 items-center">
//           {[
//             { to: "/users/watched", label: "Watched" },
//             { to: "/users/watchlist", label: "Watchlist" },
//           ].map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               className={({ isActive }) =>
//                 twMerge(
//                   "rounded-lg px-3 py-2 font-inter font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
//                   isActive &&
//                     "text-accent relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent",
//                 )
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//           <Button
//             onClick={() => setIsOpen((prev) => !prev)}
//             type="button"
//             className="hidden md:flex relative h-auto w-auto items-center gap-1.5 rounded-lg bg-transparent px-3 py-2 font-medium text-primary shadow-none hover:bg-gray-100 hover:text-primary focus:ring-accent/40 active:scale-100"
//           >
//             <span>{name.split(" ")[name.split(" ").length - 1]}</span>

//             <FaChevronDown
//               size={14}
//               strokeWidth={2.2}
//               className="text-gray-700"
//             />
//           </Button>
//           <div
//             className={twMerge(
//               "  absolute right-4 top-full mt-3 w-60 rounded-2xl before:absolute before:-top-2 before:right-8 before:h-4 before:w-4 before:rotate-45 before:border-l before:border-t before:border-gray-200 before:bg-white before:content-[''] origin-top-right border border-gray-200 bg-white shadow-xl transition-all duration-200 ease-out",
//               isOpen
//                 ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
//                 : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
//             )}
//           >
//             <div className="border-b border-gray-200 text-left p-4">
//               <h3 className="font-poppins text-lg font-semibold text-primary">
//                 {name}
//               </h3>

//               <p className="mt-1 font-inter text-sm text-secondary">{email}</p>
//             </div>

//             <div>
//               {[
//                 {
//                   to: "/users/profile",
//                   label: "View Profile",
//                 },
//                 {
//                   to: "/users/liked",
//                   label: "Liked Movies",
//                 },
//                 {
//                   to: "/users/reviews",
//                   label: "Reviews",
//                 },
//               ].map((link) => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   className="block  px-4 py-3 font-inter text-primary transition-colors duration-200 hover:bg-gray-100 text-left"
//                 >
//                   {link.label}
//                 </NavLink>
//               ))}
//             </div>

//             <div className="border-t border-gray-200 ">
//               <button
//                 type="button"
//                 className="w-full cursor-pointer rounded-b-2xl px-4 py-3 text-left font-inter text-red-600 transition-colors duration-200 hover:bg-red-50 flex gap-2 items-center"
//               >
//                 <IoExitOutline />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="w-full flex outline-1 outline-gray-300 rounded-xl items-center mt-2 p-1 bg-gray-100 md:hidden">
//         <FaSearch
//           className="text-gray-400 text-sm "
//           onClick={(e) => searchMovies(e, ref2)}
//         />
//         <input
//           type="text"
//           placeholder="Search movies..."
//           className="w-full ml-1 outline-0 placeholder:text-xs  font-inter font-medium text-primary text-sm"
//           enterKeyHint="search"
//           ref={ref2}
//           onKeyDown={(e) => searchMovies(e, ref2)}
//         />
//       </div>
//     </nav>
//   );
// };

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center p-2 md:px-5 md:py-2.5 md:flex-nowrap flex-wrap border-b border-gray-200 sticky top-0 bg-white z-50">
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
};
// export default Navbar

export default Navbar;
