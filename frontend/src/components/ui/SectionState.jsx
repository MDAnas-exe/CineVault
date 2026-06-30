import { IoReload } from "react-icons/io5";
const SectionState = ({
  imageSource,
  buttonText,
  message,
  description,
  onRetry,
}) => {
  return (
    <div className="flex  flex-col items-center justify-center  gap-1.5 md:gap-3 md:px-4 text-center">
      <img
        src={imageSource}
        alt={message}
        className="h-30 md:w-1/5 w-full min-w-30 object-contain"
      />

      <p className="font-poppins text-md font-bold text-primary md:text-3xl">
        {message}
      </p>

      <p className=" font-inter text-sm text-secondary md:text-xl">
        {description}
      </p>

      {buttonText && (
        <button
          className="text-primary cursor-pointer rounded-lg bg-accent px-3 py-1 font-inter text-sm font-bold  transition-colors duration-300 hover:bg-[#B8860B] md:px-5 md:text-lg flex items-center gap-2"
          onClick={onRetry}
        >
          <IoReload />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SectionState;
