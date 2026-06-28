import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";
import { IoReload } from "react-icons/io5";
const SectionState = ({ type, message, description, onRetry }) => {
  return (
    <div className="flex  flex-col items-center justify-center  gap-1.5 md:gap-3 md:px-4 text-center">
      <img
        src={type === "empty" ? emptySign : errorSign}
        alt={type}
        className="h-30 md:w-1/5 w-full min-w-30 object-contain"
      />

      <p className="font-poppins text-md font-bold text-primary md:text-3xl">
        {message}
      </p>

      <p className="max-w-md font-inter text-sm text-secondary md:text-xl">
        {description}
      </p>

      <button
        className=" cursor-pointer rounded-lg bg-accent px-3 py-1 font-inter text-xs font-medium text-white transition-colors duration-300 hover:bg-[#B8860B] md:px-5 md:text-md flex items-center gap-2"
        onClick={onRetry}
      >
        <IoReload fill="white" />
        {type === "empty" ? "Refresh" : "Retry"}
      </button>
    </div>
  );
};

export default SectionState;
