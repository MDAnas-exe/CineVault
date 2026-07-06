import React from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaRegBookmark,
  FaRegHeart,
  FaCheck,
  FaPlay,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";
import errorBg from "../../../assets/images/heroError.png";
const HeroSection = () => {
  const { id } = useParams();
  const { movie, isLoading, isError, refetch } = useFetchMovieDetails(id);

  if (isLoading) {
    return (
      <div className="relative min-h-[70vh] overflow-hidden bg-neutral-900 font-inter">
        <div className="absolute inset-0 animate-pulse bg-neutral-800" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 flex items-start gap-10 p-10">
          <Skeleton
            width={256}
            height={384}
            className="shrink-0 rounded-xl"
            baseColor="#52525b"
            highlightColor="#6b7280"
          />

          <div className="flex w-full max-w-2xl flex-col gap-5 pt-4">
            <Skeleton
              width={420}
              height={52}
              baseColor="#52525b"
              highlightColor="#6b7280"
            />

            <Skeleton
              width={260}
              height={24}
              baseColor="#52525b"
              highlightColor="#6b7280"
            />

            <div className="flex items-center gap-5">
              <Skeleton
                width={65}
                height={28}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
              <Skeleton
                width={90}
                height={20}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
              <Skeleton
                width={80}
                height={20}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
              <Skeleton
                width={90}
                height={20}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
            </div>

            <div className="flex gap-2">
              <Skeleton
                width={80}
                height={30}
                borderRadius={999}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
              <Skeleton
                width={95}
                height={30}
                borderRadius={999}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
              <Skeleton
                width={75}
                height={30}
                borderRadius={999}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
            </div>

            <Skeleton count={4} baseColor="#52525b" highlightColor="#6b7280" />

            <div className="mt-3 flex gap-3">
              <Skeleton
                width={180}
                height={46}
                borderRadius={10}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
              <Skeleton
                width={180}
                height={46}
                borderRadius={10}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
              <Skeleton
                width={110}
                height={46}
                borderRadius={10}
                baseColor="#52525b"
                highlightColor="#6b7280"
              />
            </div>

            <Skeleton
              width={170}
              height={46}
              borderRadius={10}
              baseColor="#52525b"
              highlightColor="#6b7280"
            />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="flex min-h-[70vh] items-center justify-center bg-center  bg-no-repeat"
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

      <div className="relative z-10 flex gap-10 p-10 items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path || backdrop_path}`}
          alt={title}
          className="w-64 rounded-xl shadow-lg shrink-0"
        />

        <div className="flex flex-col gap-4 text-white pt-4">
          <h1 className="font-poppins font-bold text-5xl">{title}</h1>

          {tagline && <p className="italic text-white/70 text-lg">{tagline}</p>}

          <div className="flex items-center gap-4 text-white/80">
            <div className="flex items-center gap-1 text-accent font-bold text-xl">
              <FaStar />
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </div>
            <span className="text-white/40">•</span>
            <span>{formattedVoteCount}</span>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              {releaseYear}
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-2">
              <FaClock />
              {formattedRuntime}
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-2">
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

          <p className="text-white/80 line-clamp-4 max-w-2xl">{overview}</p>

          <div className="flex gap-3 mt-2">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-primary font-semibold hover:brightness-110 transition-all duration-300 cursor-pointer">
              <FaRegBookmark />
              Add to Watchlist
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/40 text-white font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer">
              <FaCheck />
              Mark as Watched
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/40 text-white font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer">
              <FaRegHeart />
              Like
            </button>
          </div>

          {trailer && (
            <div className="flex gap-3 mt-1">
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
