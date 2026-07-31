import { Link } from "react-router-dom";
import { PiFilmReelFill } from "react-icons/pi";
import Logo from "../ui/Logo";
const Footer = () => {
  return (
    <footer className="mx-5 my-3 lg:my-10 border-t border-gray-200 pt-3 lg:pt-10">
      <div className="flex flex-col gap-2 md:gap-5">
        <Logo />

        <div className="font-inter text-xs md:text-base lg:text-xl  text-[#404246]">
          <p>Your ultimate companion for discovering</p>
          <p>movies,tracking your watchlist,and</p>
          <p>sharing your love for cinema.</p>
        </div>

        <div className="font-inter text-primary text-sm md:text-xl lg:text-2xl font-semibold md:space-y-4">
          <p className="cursor-pointer hover:text-accent transition-colors">
            About
          </p>

          <p className="cursor-pointer hover:text-accent transition-colors">
            Contact
          </p>
        </div>

        <div className="border-t border-gray-200 pt-2 md:pt-6">
          <p className="font-inter text-secondary text-xs md:text-base lg:text-lg">
            © 2026 CineVault
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
