import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between border-b border-gray-200 bg-white px-3 py-2 sm:px-4 md:flex-nowrap md:px-5 md:py-2.5">
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
};

export default Navbar;
