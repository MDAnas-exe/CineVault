import { IoReload } from "react-icons/io5";
const SectionState = ({
  imageSource,
  buttonText,
  message,
  description,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-3 text-center sm:gap-3 md:px-4">
      {imageSource && (
        <img
          src={imageSource}
          alt={message}
          className="h-32 w-32 object-contain sm:h-36 sm:w-36 lg:h-40 lg:w-40"
        />
      )}

      {message && (
        <p className="font-poppins text-lg font-bold text-primary sm:text-xl lg:text-2xl">
          {message}
        </p>
      )}

      {description && (
        <p className="font-inter text-sm text-secondary sm:text-base lg:text-lg">
          {description}
        </p>
      )}

      {buttonText && (
        <button
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-4 py-2 font-inter text-sm font-bold text-primary transition-colors duration-300 hover:bg-accent-hover sm:text-base lg:px-5 lg:text-lg"
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
