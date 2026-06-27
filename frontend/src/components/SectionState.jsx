import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";
import { IoReload } from "react-icons/io5";
const SectionState = ({ type, message, description, onRetry }) => {
  return (
    <div className="flex  flex-col items-center justify-center gap-3 px-4 text-center">
      <img
        src={type === "empty" ? emptySign : errorSign}
        alt={type}
        className="h-30 w-1/5 min-w-30 object-contain"
      />

      <p className="font-poppins text-2xl font-bold text-primary md:text-3xl">
        {message}
      </p>

      <p className="max-w-md font-inter text-base text-secondary md:text-xl">
        {description}
      </p>

      <button
        className="mt-2 cursor-pointer rounded-lg bg-accent px-6 py-1 font-inter text-base font-medium text-white transition-colors duration-300 hover:bg-[#B8860B] md:px-5 md:text-md flex items-center gap-2"
        onClick={onRetry}
      >
        <IoReload fill="white" />
        {type === "empty" ? "Refresh" : "Retry"}
      </button>
    </div>
  );
};

export default SectionState;
