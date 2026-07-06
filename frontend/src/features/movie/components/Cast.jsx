import { HiOutlineSearch } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useFetchMovieCredits from "../hooks/useFetchMovieCredits";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";
export default function Cast() {
  const { id } = useParams();

  const {
    data: cast,
    isLoading,
    isError,
    refetch,
  } = useFetchMovieCredits(id, "cast");

  if (isLoading) {
    return (
      <section className="mt-8">
        <Skeleton width={180} height={48} className="mb-8" />

        <div className="grid grid-cols-6 gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
            >
              <Skeleton height={200} className="rounded-xl" />

              <div className="mt-3 space-y-2">
                <Skeleton height={28} width="80%" />
                <Skeleton height={20} width="60%" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white py-16 shadow-sm">
        <SectionState
          message="Couldn't load cast"
          description="We couldn't retrieve the cast information for this movie."
          buttonText="Try Again"
          onRetry={refetch}
        />
      </section>
    );
  }

  if (cast.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white py-16">
        <SectionState
          message="No cast information available"
          description="This movie doesn't have any cast information available yet."
        />
      </section>
    );
  }

  return (
    <section className=" mt-8 ">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-poppins text-5xl font-bold text-primary">
          Cast{" "}
          <span className="font-inter text-2xl font-medium text-gray-300">
            ({cast.length})
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-6 gap-8">
        {cast.map((member) => (
          <div
            key={member.cast_id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {member.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                alt={member.name}
                className="aspect-3/4 w-full object-cover"
              />
            ) : (
              <div className="flex aspect-3/4 items-center justify-center bg-gray-100">
                <FaUserCircle className="text-[8rem] text-gray-300" />
              </div>
            )}

            <div className="space-y-1 p-2">
              <h3 className="line-clamp-2 font-poppins text-xl font-semibold text-primary">
                {member.name}
              </h3>

              <p className="line-clamp-2 font-inter text-base text-secondary">
                {member.character || "Unknown Character"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
