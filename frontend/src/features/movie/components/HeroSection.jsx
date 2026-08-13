import { useParams } from "react-router-dom";
import {
  FaStar,
  FaPlay,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";
import errorBg from "../../../assets/images/heroError.png";
import UserBtnSection from "../../../components/ui/UserBtnSection";
import UserActionButton from "../../../components/ui/UserActionButton";
import HeroButtonSkeleton from "../../../components/ui/HeroButtonSkeleton";

const HeroSection = () => {
  const { id } = useParams();
  const { data: movie, isLoading, isError, refetch } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => apiRequest({ endpoint: `movies/${id}`, method: "GET" }),
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#52525b" highlightColor="#6b7280">
        <div className="relative min-h-[70vh] w-full font-inter">
          <div className="absolute inset-0">
            <div className="h-full w-full animate-pulse bg-neutral-800" />
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex md:flex-row flex-col items-start gap-10 p-10">
            <div className="w-50 shrink-0 overflow-hidden rounded-xl lg:w-64 self-center">
              <Skeleton className="aspect-2/3 h-full" />
            </div>

            <div className="flex flex-col gap-2 text-white lg:gap-4 lg:pt-4 w-full md:w-7/12 lg:w-11/12">
              <Skeleton className="h-12 w-full max-w-105" />

              <Skeleton className="h-6 w-64" />

              <div className="flex items-center gap-2 lg:gap-4">
                <div className="w-16">
                  <Skeleton className="h-7" />
                </div>

                <div className="w-24">
                  <Skeleton className="h-5" />
                </div>

                <div className="w-20">
                  <Skeleton className="h-5" />
                </div>

                <div className="w-24">
                  <Skeleton className="h-5" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="w-20">
                  <Skeleton className="h-8 rounded-full" />
                </div>

                <div className="w-24">
                  <Skeleton className="h-8 rounded-full" />
                </div>

                <div className="w-20">
                  <Skeleton className="h-8 rounded-full" />
                </div>
              </div>

              <Skeleton count={2} />

              <HeroButtonSkeleton />

              <div className="mt-1 flex gap-3 text-xs lg:text-base">
                <div className="w-44">
                  <Skeleton className="h-11.5 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (isError) {
    return (
      <div
        className="flex h-100 lg:h-120 items-center justify-center bg-center md:bg-auto bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${errorBg})` }}
      >
        <SectionState
          message="Unable to load movie"
          description="Something went wrong while fetching the movie details. Please try again."
          buttonText="Try Again"
          onRetry={refetch}
        />
      </div>
    );
  }

  const {
    title,
    tagline,
    overview,
    backdrop_path,
    poster_path,
    vote_average,
    vote_count,
    runtime,
    release_date,
    spoken_languages,
    genres,
    videos,
  } = movie;

  const releaseYear = release_date ? release_date.split("-")[0] : "N/A";

  const hours = runtime ? Math.floor(runtime / 60) : null;
  const minutes = runtime ? runtime % 60 : null;
  const formattedRuntime = runtime ? `${hours}h ${minutes}m` : "N/A";

  const language = spoken_languages?.[0]?.english_name || "N/A";

  const trailer = videos?.results?.find((v) => v.type === "Trailer");

  const formattedVoteCount = !vote_count
    ? "N/A"
    : vote_count >= 1000000
      ? `${(vote_count / 1000000).toFixed(1)}M votes`
      : vote_count >= 1000
        ? `${(vote_count / 1000).toFixed(1)}K votes`
        : `${vote_count} votes`;

  return (
    <div className="relative w-full h-full min-h-[70vh] font-inter">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex gap-5 md:gap-10 p-2 md:p-10 items-start md:flex-row flex-col">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path || backdrop_path}`}
          alt={title}
          className="w-50 lg:w-64 rounded-xl shadow-lg shrink-0 lg:self-auto md:self-end self-center"
        />

        <div className="flex flex-col gap-2 lg:gap-4 text-white lg:pt-4">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl">
            {title}
          </h1>

          {tagline && (
            <p className="italic text-white/70 text-base lg:text-lg">
              {tagline}
            </p>
          )}

          <div className="flex items-center gap-2 lg:gap-4 text-white/80">
            <div className="flex items-center gap-1 text-accent font-bold text-base lg:text-xl">
              <FaStar />
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </div>
            <span className="text-white/40">•</span>
            <span>{formattedVoteCount}</span>
            <span className="text-white/40">|</span>
            <div className="hidden xs:flex items-center gap-2 ">
              <FaCalendarAlt />
              {releaseYear}
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-2">
              <FaClock />
              {formattedRuntime}
            </div>
            <span className="hidden xs:block text-white/40">•</span>
            <div className="hidden xs:flex items-center gap-2">
              <FaGlobe />
              {language}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 rounded-full border border-white/30 text-white/80 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-white/80 line-clamp-4 text-sm max-w-2xl">
            {overview}
          </p>

          <UserBtnSection
            variant="hero"
            className={"flex gap-3 mt-2 lg:text-base text-xs"}
            isLoading={false}
            isError={false}
          >
            <UserActionButton
              iconKey="watchlist"
              label="Add to Watchlist"
              id={id}
              endpoint={`users/watchlist/${id}`}
              isActive={false}
              className="px-1 md:px-5 md:py-2.5 rounded-lg h-auto w-auto bg-transparent hover:bg-white/10 border border-white/40 text-white font-medium"
            />
            <UserActionButton
              iconKey="watched"
              label="Mark as Watched"
              id={id}
              endpoint={`users/watched/${id}`}
              isActive={false}
              className="px-1 md:px-5 md:py-2.5 rounded-lg h-auto w-auto bg-transparent hover:bg-white/10 border border-white/40 text-white font-medium"
            />
            <UserActionButton
              iconKey="like"
              label="Like"
              id={id}
              endpoint={`users/likes/${id}`}
              isActive={false}
              className="px-1 md:px-5 md:py-2.5 rounded-lg h-auto w-auto bg-transparent hover:bg-white/10 border border-white/40 text-white font-medium"
            />
          </UserBtnSection>

          {trailer && (
            <div className="flex gap-3 mt-1 lg:text-base text-xs">
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/40 text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                <FaPlay />
                Watch Trailer
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
