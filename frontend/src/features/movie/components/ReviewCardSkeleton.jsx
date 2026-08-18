import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReviewCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-neutral-50 px-5 py-4 font-inter">
      {/* Username */}
      <Skeleton width={96} height={14} borderRadius={6} />

      {/* Review body */}
      <div className="mt-3 flex flex-col gap-1.5">
        <Skeleton width="80%" height={13} borderRadius={6} />
        <Skeleton width="80%" height={13} borderRadius={6} />
        <Skeleton width="40%" height={13} borderRadius={6} />
      </div>

      {/* Timestamp � bottom right */}
      <div className="mt-4 flex justify-end">
        <Skeleton width={100} height={12} borderRadius={6} />
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
