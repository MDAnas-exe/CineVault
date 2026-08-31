import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserReviewCardSkeleton = () => (
  <div
    aria-hidden="true"
    className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] content-start gap-3.5 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-4 sm:p-5 xl:grid-cols-[5.5rem_minmax(0,1fr)]"
  >
    <div className="aspect-2/3">
      <Skeleton height="100%" borderRadius={8} containerClassName="block h-full" />
    </div>
    <div className="min-w-0 pt-0.5">
      <Skeleton width="80%" height={20} />
      <Skeleton width={44} height={13} className="mt-1" />
    </div>
    <div className="col-span-2">
      <Skeleton count={3} />
      <Skeleton width="65%" />
    </div>
    <div className="col-span-2">
      <div className="border-b border-neutral-200 pb-2.5">
        <Skeleton width="75%" height={12} />
      </div>
      <div className="mt-2.5">
        <Skeleton width={88} height={15} />
      </div>
    </div>
  </div>
);

export default UserReviewCardSkeleton;
