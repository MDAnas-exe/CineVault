import { FaExclamationCircle } from "react-icons/fa";
import HeroButtonSkeleton from "./HeroButtonSkeleton";
import SearchButtonSkeleton from "./SearchButtonSkeleton";

const UserBtnSection = ({ className = "", isLoading, isError, variant, children }) => {
  if (isLoading) {
    return variant === "hero" ? <HeroButtonSkeleton /> : <SearchButtonSkeleton />;
  }

  if (isError) {
    return (
      <div className={className}>
        <span className="flex items-center gap-1 text-red-400 font-inter">
          <FaExclamationCircle />
          Failed to load status
        </span>
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

export default UserBtnSection;
