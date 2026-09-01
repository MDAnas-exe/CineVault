import { PiFilmReelFill } from "react-icons/pi";
const Logo = () => {
  return (
    <div className="logo flex items-center gap-1 text-xl sm:text-2xl lg:text-3xl">
      <PiFilmReelFill className="size-5 sm:size-6 lg:size-7" fill="#d4a017" />
      <span className="font-poppins font-bold">
        <span className="text-primary">Cine</span>
        <span className="text-accent">Vault</span>
      </span>
    </div>
  );
};
export default Logo;
