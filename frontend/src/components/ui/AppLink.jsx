import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const AppLink = ({ children, to, className = "" }) => {
  return (
    <Link
      to={to}
      className={twMerge(
        "font-inter text-primary hover:text-accent transition-colors duration-200",
        className,
      )}
    >
      {children}
    </Link>
  );
};
export default AppLink;
