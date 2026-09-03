import { twMerge } from "tailwind-merge";

const PageContentWrapper = ({ children, className = "" }) => {
  return (
    <div
      className={twMerge(
        "mx-auto w-full px-3 py-5 lg:w-85/100 min-h-[70vh]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageContentWrapper;
