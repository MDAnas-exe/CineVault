import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";
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
  } = useQuery({
    queryKey: ["movie-credits", id, "cast"],
    queryFn: async ({ signal }) => {
      const data = await apiRequest({
        endpoint: `movies/${id}/credits`,
        method: "GET",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      });
      return data.cast;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <section className="md:mt-8 mt-4">
        <div className="w-30 h-8 md:w-45 md:h-12 md:mb-8 mb-4">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 md:gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
            >
              <div className="aspect-square md:aspect-2/3 w-full">
                <Skeleton width="100%" height="100%" className="rounded-xl" />
              </div>

              <div className="mt-3 space-y-2">
                <div className="h-7 w-4/5">
                  <Skeleton width="100%" height="100%" />
                </div>

                <div className="h-5 w-3/5">
                  <Skeleton width="100%" height="100%" />
                </div>
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
        <h2 className="font-poppins text-2xl md:text-5xl font-bold text-primary">
          Cast{" "}
          <span className="font-inter text-2xl font-medium text-gray-300">
            ({cast.length})
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-6 md:grid-cols-4 gap-8 grid-cols-2">
        {cast.map((member) => (
          <div
            key={member.cast_id ?? member.credit_id ?? member.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {member.profile_path ? (
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                alt={member.name}
                className=" aspect-square md:aspect-3/4 w-full md:object-cover object-top"
              />
            ) : (
              <div className="flex aspect-3/4 items-center justify-center bg-gray-100">
                <FaUserCircle className="text-[8rem] text-gray-300" />
              </div>
            )}

            <div className="space-y-1 p-2">
              <h3 className="line-clamp-2 font-poppins md:text-xl font-semibold text-primary">
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
