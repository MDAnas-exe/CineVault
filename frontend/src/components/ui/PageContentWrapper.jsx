import { twMerge } from "tailwind-merge";

const PageContentWrapper = ({ children, className = "" }) => {
  return (
    <div className={twMerge("mx-auto w-full px-3 py-5 lg:w-9.5/10", className)}>
      {children}
    </div>
  );
};

export default PageContentWrapper;
