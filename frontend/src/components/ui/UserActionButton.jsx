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
  like: { outline: FaRegHeart, solid: FaHeart },
  watchlist: { outline: FaRegBookmark, solid: FaBookmark },
  watched: { outline: FaRegEye, solid: FaEye },
};

const CrossFadeIcon = ({ iconKey, isActive, label }) => {
  const icons = ICON_MAP[iconKey];
  if (!icons) return null;
  const { outline: Outline, solid: Solid } = icons;
  return (
    <span className={`relative size-4 ${!label && "size-full"} `}>
      <Outline
        className={`absolute inset-0 transition-opacity duration-200  ${!label && "m-auto"}`}
        style={{ opacity: isActive ? 0 : 1 }}
      />
      <Solid
        className={`absolute inset-0 transition-opacity duration-200 ${!label && "m-auto"}`}
        style={{ opacity: isActive ? 1 : 0, color: "#D4A017" }}
      />
    </span>
  );
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
  return (
    <Button
      type="button"
      title={title}
      className={twMerge(`flex items-center gap-2 `, className)}
    >
      <CrossFadeIcon iconKey={iconKey} isActive={isActive} label={label} />
      {label && <span>{label}</span>}
    </Button>
  );
};

export default UserActionButton;
