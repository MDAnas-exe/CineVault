import {
  FaCalendarAlt,
  FaCoins,
  FaChartLine,
  FaGlobe,
  FaBuilding,
  FaInfoCircle,
  FaFlag,
  FaImdb,
  FaLink,
} from "react-icons/fa";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";

const InfoCard = ({
  icon: Icon,
  title,
  children,
  className = "",
  horizontal = false,
}) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white md:p-5 p-1 shadow-sm ${className}`}
  >
    <div
      className={`flex items-center gap-1 md:gap-3${horizontal ? "mb-4 " : "mb-3 "}`}
    >
      <Icon className="md:text-2xl text-accent" />
      <h3 className="font-poppins font-semibold text-primary">{title}</h3>
    </div>

    <div
      className={`font-inter text-secondary md:text-base text-sm ${
        horizontal ? "flex flex-wrap items-center gap-4 md:gap-8" : ""
      }`}
    >
      {children}
    </div>
  </div>
);

export default function Details() {
  const { id } = useParams();

  const { movie, isLoading, isError, refetch } = useFetchMovieDetails(id);

  if (isLoading) {
    return (
      <section className="mt-6 flex gap-6">
        <div className="grid flex-1 grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <Skeleton circle width={32} height={32} />
                <Skeleton width="70%" height={22} />
              </div>
              <Skeleton width="60%" height={24} />
            </div>
          ))}

          <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Skeleton circle width={32} height={32} />
              <Skeleton width={220} height={24} />
            </div>

            <div className="flex flex-wrap gap-8">
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

          <div className="col-span-2 flex gap-4">
            <Skeleton height={56} className="flex-1" borderRadius={12} />
            <Skeleton height={56} className="flex-1" borderRadius={12} />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto mt-6 rounded-xl border border-gray-200 bg-white py-15 md:py-30 shadow-sm">
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
    release_date,
    budget,
    revenue,
    spoken_languages,
    original_language,
    production_companies,
    production_countries,
    status,
    imdb_id,
    homepage,
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

  const countries =
    production_countries?.map((c) => c.name).join(", ") || "N/A";

  return (
    <section className="mt-6 flex gap-6">
      <div className="grid flex-1 grid-cols-2 gap-4">
        <InfoCard icon={FaCalendarAlt} title="Release Date">
          {formattedDate}
        </InfoCard>

        <InfoCard icon={FaCoins} title="Budget">
          {formattedBudget}
        </InfoCard>

        <InfoCard icon={FaGlobe} title="Original Language">
          {language}
        </InfoCard>

        <InfoCard icon={FaChartLine} title="Revenue">
          {formattedRevenue}
        </InfoCard>

        <InfoCard icon={FaInfoCircle} title="Status">
          {status || "N/A"}
        </InfoCard>

        <InfoCard icon={FaFlag} title="Production Countries">
          {countries}
        </InfoCard>

        <InfoCard
          icon={FaBuilding}
          title="Production Companies"
          className="col-span-2"
          horizontal
        >
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
                  <p className="text-sm">{company.name}</p>
                )}
              </div>
            ))
          ) : (
            <p>No production companies available.</p>
          )}
        </InfoCard>

        {(imdb_id || homepage) && (
          <div className="col-span-2 flex gap-4">
            {imdb_id && (
              <a
                href={`https://www.imdb.com/title/${imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl p-2 border border-gray-200 bg-white md:p-4 font-inter text-secondary shadow-sm hover:bg-gray-50 md:text-base text-xs"
              >
                <FaImdb className="text-2xl text-accent" />
                View on IMDb
              </a>
            )}

            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl p-2 border border-gray-200 bg-white md:p-4 font-inter text-secondary shadow-sm hover:bg-gray-50 md:text-base text-xs"
              >
                <FaLink className="text-2xl text-accent" />
                Official Site
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
