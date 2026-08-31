import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserReviewCardSkeleton = () => (
  <div aria-hidden="true" className="grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm xl:grid-cols-[6rem_minmax(0,1fr)] xl:p-5">
    <div className="aspect-2/3">
      <Skeleton height="100%" borderRadius={8} containerClassName="block h-full" />
    </div>
    <div className="min-w-0 pt-1">
      <Skeleton width="80%" height={22} />
      <Skeleton width={44} height={14} />
    </div>
    <div className="col-span-2">
      <Skeleton count={3} />
      <Skeleton width="65%" />
    </div>
    <div className="col-span-2">
      <div className="border-b border-neutral-200 pb-3"><Skeleton width="85%" height={12} /></div>
      <div className="mt-3"><Skeleton width={96} height={16} /></div>
    </div>
  </div>
);

export default UserReviewCardSkeleton;
