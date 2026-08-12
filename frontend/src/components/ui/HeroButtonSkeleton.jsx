import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroButtonSkeleton = () => {
  return (
    <div className="mt-2 flex gap-3 text-xs lg:text-base">
      <div className="w-44">
        <Skeleton className="h-11.5 rounded-lg" />
      </div>

      <div className="w-44">
        <Skeleton className="h-11.5 rounded-lg" />
      </div>

      <div className="w-28">
        <Skeleton className="h-11.5 rounded-lg" />
      </div>
    </div>
  );
};

export default HeroButtonSkeleton;
