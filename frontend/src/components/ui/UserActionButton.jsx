import { twMerge } from "tailwind-merge";
import {
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegEye,
  FaEye,
} from "react-icons/fa";
import Button from "./Button";

const ICON_MAP = {
  like:      { inactive: <FaRegHeart />,     active: <FaHeart /> },
  watchlist: { inactive: <FaRegBookmark />,  active: <FaBookmark /> },
  watched:   { inactive: <FaRegEye />,       active: <FaEye /> },
};

const UserActionButton = ({
  iconKey,
  label = "",
  title = "",
  className = "",
  id,
  endpoint,
  isActive = false,
}) => {
  const iconSet = ICON_MAP[iconKey] ?? null;
  const icon = iconSet ? (isActive ? iconSet.active : iconSet.inactive) : null;
  return (
    <Button
      type="button"
      title={title}
      className={twMerge(`flex items-center gap-2 `, className)}
    >
      <span
        className={`transition-colors duration-200 ${isActive ? "text-accent" : ""} ${!label && "mx-auto"}`}
      >
        {icon}
      </span>
      {label && <span>{label}</span>}
    </Button>
  );
};

export default UserActionButton;
