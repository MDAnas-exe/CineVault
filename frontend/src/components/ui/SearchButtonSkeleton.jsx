import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchButtonSkeleton = () => {
  return (
    <div className="flex items-center w-full sm:w-auto sm:gap-3 justify-around">
      <Skeleton circle width={28} height={28} />
      <Skeleton circle width={28} height={28} />
      <Skeleton circle width={28} height={28} />
    </div>
  );
};

export default SearchButtonSkeleton;
