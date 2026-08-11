import { twMerge } from "tailwind-merge";
import Button from "./Button";

const UserActionButton = ({
  icon,
  label = "",
  title = "",
  className = "",
  id,
  endpoint,
  isActive = false,
}) => {
  return (
    <Button
      type="button"
      title={title}
      className={twMerge("flex items-center gap-2", className)}
    >
      <span
        className={`transition-colors duration-200 ${isActive ? "text-accent" : ""}`}
      >
        {icon}
      </span>
      {label && <span>{label}</span>}
    </Button>
  );
};

export default UserActionButton;
