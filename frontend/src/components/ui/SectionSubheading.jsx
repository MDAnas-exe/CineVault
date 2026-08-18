import { twMerge } from "tailwind-merge";

const SectionSubheading = ({ children, className = "" }) => {
  return (
    <h3
      className={twMerge(
        "mb-5 font-poppins text-xl font-semibold text-primary md:text-3xl",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export default SectionSubheading;
