import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
const UserMenuLinks = ({ to, label, className = "" }) => {
  return (
    <Link
      to={to}
      className={twMerge(
        "block  px-4 py-3 font-inter text-primary transition-colors duration-200 hover:bg-gray-100 text-left",
        className,
      )}
    >
      {label}
    </Link>
  );
};
export default UserMenuLinks;
