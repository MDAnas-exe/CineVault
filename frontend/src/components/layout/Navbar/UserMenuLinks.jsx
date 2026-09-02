import { twMerge } from "tailwind-merge";

const UserMenuLinks = ({ icon, label, className = "" }) => {
  return (
    <span className={twMerge("flex items-center gap-2", className)}>
      {icon}
      {label}
    </span>
  );
};

export default UserMenuLinks;
