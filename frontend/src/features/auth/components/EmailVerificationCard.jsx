import Loader from "./Loader";

function EmailVerificationCard({
  imgSrc,
  heading,
  subHeading,
  loaderMessage,
  footerMessage,
  className = "",
}) {
  return (
    <div
      className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-6 py-8 sm:px-8 sm:py-10 text-center shadow-sm opacity-0 transition-all duration-1000 ease-in-out ${className}`}
    >
      <img
        loading="lazy"
        src={imgSrc}
        alt=""
        className="mb-6 sm:mb-8 size-32 sm:size-44 object-contain"
      />

      <h1 className="mb-3 text-2xl sm:text-3xl font-semibold text-primary">
        {heading}
      </h1>

      <p className="mb-6 sm:mb-8 text-xs sm:text-sm leading-6 text-[#6B7280]">
        {subHeading}
      </p>

      <Loader className="mb-4 sm:mb-5" />

      <p className="mb-8 sm:mb-10 text-xs sm:text-sm text-[#6B7280]">
        {loaderMessage}
      </p>

      <p className="text-xs sm:text-sm text-[#9CA3AF]">{footerMessage}</p>
    </div>
  );
}

export default EmailVerificationCard;
