import {
  FaCalendarAlt,
  FaCoins,
  FaChartLine,
  FaGlobe,
  FaBuilding,
} from "react-icons/fa";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";
export default function Overview() {
  const { id } = useParams();

  const { movie, isLoading, isError, refetch } = useFetchMovieDetails(id);

  if (isLoading) {
    return (
      <section className=" mt-6 flex  items-start gap-6">
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <Skeleton width={180} height={40} />

          <div className="mt-8 space-y-4">
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton width="75%" height={24} />
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Skeleton circle width={32} height={32} />

                  <div className="flex-1">
                    <Skeleton width="70%" height={22} />
                  </div>
                </div>

                <div className="mt-5">
                  <Skeleton width="60%" height={24} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Skeleton circle width={32} height={32} />
              <Skeleton width={220} height={24} />
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  width={120}
                  height={50}
                  borderRadius={6}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (true) {
    return (
      <section className="mx-auto mt-6 rounded-xl border border-gray-200 bg-white py-30 shadow-sm">
        <SectionState
          message="Couldn't load overview"
          description="We couldn't retrieve the movie information. Please try again."
          buttonText="Try Again"
          onRetry={refetch}
        />
      </section>
    );
  }

  const {
    overview,
    release_date,
    budget,
    revenue,
    spoken_languages,
    original_language,
    production_companies,
  } = movie;

  const formattedDate = release_date
    ? new Date(release_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const formattedBudget =
    budget > 0 ? `$${(budget / 1000000).toFixed(0)} million` : "N/A";

  const formattedRevenue =
    revenue > 0 ? `$${(revenue / 1000000).toFixed(1)} million` : "N/A";

  const language =
    spoken_languages?.[0]?.english_name || original_language || "N/A";

  return (
    <section className=" mt-6 flex  gap-6">
      <div className="flex-1 h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-poppins text-2xl font-semibold text-primary">
          Overview
        </h2>

        <p className="font-inter leading-8 text-secondary">{overview}</p>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <FaCalendarAlt className="text-2xl text-accent" />
            <h3 className="font-poppins font-semibold text-primary">
              Release Date
            </h3>
          </div>

          <p className="font-inter text-secondary">{formattedDate}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <FaCoins className="text-2xl text-accent" />
            <h3 className="font-poppins font-semibold text-primary">Budget</h3>
          </div>

          <p className="font-inter text-secondary">{formattedBudget}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <FaGlobe className="text-2xl text-accent" />
            <h3 className="font-poppins font-semibold text-primary">
              Original Language
            </h3>
          </div>

          <p className="font-inter text-secondary">{language}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <FaChartLine className="text-2xl text-accent" />
            <h3 className="font-poppins font-semibold text-primary">Revenue</h3>
          </div>

          <p className="font-inter text-secondary">{formattedRevenue}</p>
        </div>

        <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <FaBuilding className="text-2xl text-accent" />
            <h3 className="font-poppins font-semibold text-primary">
              Production Companies
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            {production_companies?.length ? (
              production_companies.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center gap-2"
                >
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-10 object-contain"
                    />
                  ) : (
                    <p className="font-inter text-sm text-secondary">
                      {company.name}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="font-inter text-secondary">
                No production companies available.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
