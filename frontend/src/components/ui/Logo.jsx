import { PiFilmReelFill } from "react-icons/pi";
const Logo = () => {
  return (
    <div className="logo flex items-center gap-0.5 md:text-2xl lg:text-3xl ">
      <PiFilmReelFill fill="#d4a017" />
      <span className="font-bold font-poppins ">
        <span className=" text-primary">Cine</span>
        <span className="text-accent">Vault</span>
      </span>
    </div>
  );
};
export default Logo;
