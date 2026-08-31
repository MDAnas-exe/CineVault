import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineCalendarDays, HiOutlinePencil, HiChevronRight } from "react-icons/hi2";
import Reel from "../../../assets/images/reel.svg?react";

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};

const UserReviewCard = ({ reviewInfo, ...rest }) => {
  const { movieId, movieInfo, review, createdAt, updatedAt } = reviewInfo;
  const [failedPoster, setFailedPoster] = useState(null);
  const title = movieInfo?.title || "Movie details unavailable";
  const posterPath = movieInfo?.posterPath;
  const releaseYear = movieInfo?.releaseDate?.slice(0, 4);
  const writtenDate = formatDate(createdAt);
  const updatedDate = updatedAt !== createdAt ? formatDate(updatedAt) : null;

  return (
    <article
      {...rest}
      className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] content-start gap-x-4 gap-y-3 rounded-xl border border-neutral-200 bg-white p-4 font-inter shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-accent/30 md:grid-cols-[9rem_minmax(0,1fr)] md:grid-rows-[auto_1fr_auto] md:gap-x-6 md:gap-y-3 md:p-5 2xl:grid-cols-[11rem_minmax(0,1fr)]"
    >
      <div className="relative aspect-2/3 self-start overflow-hidden rounded-lg bg-neutral-100 md:row-span-3">
        {posterPath && failedPoster !== posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt={`${title} poster`}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setFailedPoster(posterPath)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-2 text-center text-secondary">
            <Reel className="size-8 md:size-10" aria-hidden="true" />
            <span className="text-[10px] md:text-xs">No poster</span>
          </div>
        )}
      </div>

      <div className="min-w-0 self-start pt-1 md:col-start-2">
        <h2 className="wrap-break-word font-poppins text-base font-semibold leading-snug text-primary md:inline md:text-xl">
          {title}
        </h2>
        {releaseYear && (
          <span className="mt-1 block text-sm text-secondary md:ml-2 md:mt-0 md:inline">
            <span className="hidden md:inline">(</span>{releaseYear}<span className="hidden md:inline">)</span>
          </span>
        )}
      </div>

      <p className="col-span-2 whitespace-pre-wrap wrap-anywhere text-sm leading-relaxed text-primary/90 md:col-span-1 md:col-start-2 md:text-[15px]">
        {review}
      </p>

      <footer className="col-span-2 min-w-0 md:col-span-1 md:col-start-2 md:flex md:items-center md:justify-between md:gap-4 md:border-t md:border-neutral-200 md:pt-3 xl:block">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-neutral-200 pb-3 text-xs leading-relaxed text-secondary md:border-0 md:pb-0">
          {writtenDate && (
            <span className="inline-flex items-center gap-2">
              <HiOutlineCalendarDays className="hidden size-4 shrink-0 md:block" aria-hidden="true" />
              <span>Written <time dateTime={createdAt}>{writtenDate}</time></span>
            </span>
          )}
          {updatedDate && (
            <span className="inline-flex items-center gap-2">
              {writtenDate && <span className="mr-1" aria-hidden="true">·</span>}
              <HiOutlinePencil className="hidden size-4 shrink-0 md:block" aria-hidden="true" />
              <span>Updated <time dateTime={updatedAt}>{updatedDate}</time></span>
            </span>
          )}
        </div>
        <Link
          to={`/movies/${movieId}/reviews`}
          className="group mt-2 inline-flex min-h-10 items-center gap-1 rounded-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:mt-0 md:min-h-8 md:shrink-0 xl:mt-2"
          aria-label={`View movie: ${movieInfo?.title || `movie ${movieId}`}`}
        >
          View movie
          <HiChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
};

export default UserReviewCard;
