import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaExclamationCircle } from "react-icons/fa";

const UserBtnSection = ({ className = "", isLoading, isError, children }) => {
  if (isLoading) {
    return (
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} circle width={30} height={30} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={className}>
        <span className="flex items-center gap-1 text-xs text-red-400 font-inter">
          <FaExclamationCircle />
          Failed to load status
        </span>
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

export default UserBtnSection;
