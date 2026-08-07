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

export default Navbar;
