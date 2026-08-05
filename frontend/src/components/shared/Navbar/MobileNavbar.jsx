import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import SearchBar from "./SearchBar";
const MobileNavbar = () => {
  return (
    <>
      <Link to="/" className="md:hidden">
        <Logo />
      </Link>

      <SearchBar className="flex md:hidden w-full bg-gray-100 p-1 mt-2" />
    </>
  );
};
export default MobileNavbar;
