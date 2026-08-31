import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserReviewCardSkeleton = () => (
  <div aria-hidden="true" className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm md:grid-cols-[9rem_minmax(0,1fr)] md:grid-rows-[auto_1fr_auto] md:gap-x-6 md:p-5 2xl:grid-cols-[11rem_minmax(0,1fr)]">
    <div className="aspect-2/3 md:row-span-3">
      <Skeleton height="100%" borderRadius={8} containerClassName="block h-full" />
    </div>
    <div className="pt-1 md:col-start-2">
      <Skeleton width="80%" height={22} />
      <Skeleton width={44} height={14} />
    </div>
    <div className="col-span-2 md:col-span-1 md:col-start-2">
      <Skeleton count={3} />
      <Skeleton width="65%" />
    </div>
    <div className="col-span-2 border-t border-neutral-200 pt-3 md:col-span-1 md:col-start-2">
      <Skeleton width="85%" height={12} />
      <div className="mt-3"><Skeleton width={96} height={16} /></div>
    </div>
  </div>
);

export default UserReviewCardSkeleton;
