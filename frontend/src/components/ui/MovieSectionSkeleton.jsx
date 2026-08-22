import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieSectionSkeleton = ({ variant = "row", count = 20 }) => {
  if (variant === "grid") {
    return (
      <div className="grid gap-x-4 gap-y-4 grid-cols-4  lg:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton
            key={i}
            className="aspect-2/3"
            height="100%"
            borderRadius={12}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-3 md:px-6">
      <Skeleton width={250} height={40} />

      <div
        className="flex h-56 gap-4 overflow-x-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton width={120} height={200} borderRadius={12} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MovieSectionSkeleton;
