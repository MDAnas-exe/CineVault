import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import apiRequest from "../../../utils/apiRequest";
import SectionState from "../../../components/ui/SectionState";

const ProfileStats = () => {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => apiRequest({ endpoint: "users/profile", method: "GET" }),
    select: (data) => data.stats,
  });

  if (isLoading) {
    return (
      <section
        aria-labelledby="profile-stats-heading"
        className="w-full md:w-1/2"
      >
        <h2 id="profile-stats-heading" className="sr-only">
          Profile statistics
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 ">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height={104} width="100%" borderRadius={12} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        aria-labelledby="profile-stats-heading"
        className="w-full md:w-auto"
      >
        <h2 id="profile-stats-heading" className="sr-only">
          Profile statistics
        </h2>
        <SectionState
          message="Couldn't load profile statistics."
          description="Please check your connection and try again."
          buttonText="Retry"
          onRetry={refetch}
        />
      </section>
    );
  }

  const stats = data;
  if (!stats) {
    return (
      <section
        aria-labelledby="profile-stats-heading"
        className="w-full md:w-auto"
      >
        <h2 id="profile-stats-heading" className="sr-only">
          Profile statistics
        </h2>
        <SectionState
          message="No profile statistics yet."
          description="Your movie activity will appear here."
        />
      </section>
    );
  }

  const statItems = [
    { label: "Watched", value: stats.watchedCount, icon: FaHeart },
    { label: "Liked", value: stats.likedCount, icon: FaBookmark },
    { label: "Watchlisted", value: stats.watchlistedCount, icon: FaEye },
    { label: "Reviews", value: stats.reviewCount, icon: FaMessage },
  ];

  return (
    <section
      aria-labelledby="profile-stats-heading"
      className="w-full md:w-auto"
    >
      <h2 id="profile-stats-heading" className="sr-only">
        Profile statistics
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {statItems.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-5 text-center shadow-sm"
          >
            <Icon className="mb-1 text-2xl text-accent" />
            <span className="font-poppins text-2xl font-bold text-accent sm:text-3xl">
              {value ?? 0}
            </span>
            <span className="font-inter text-sm text-secondary">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileStats;
