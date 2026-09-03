import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlinePencil,
  HiChevronRight,
} from "react-icons/hi2";
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
      className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] content-start gap-3.5 rounded-xl border border-neutral-200 bg-white p-4 font-inter shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-accent/30 sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-4 sm:p-5 xl:grid-cols-[5.5rem_minmax(0,1fr)]"
    >
      <div className="relative aspect-2/3 self-start overflow-hidden rounded-lg bg-neutral-100">
        {posterPath && failedPoster !== posterPath ? (
          <img
            loading="lazy"
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

      <div className="min-w-0 self-start pt-0.5">
        <h2 className="wrap-anywhere font-poppins text-base font-semibold leading-snug text-primary sm:text-lg">
          {title}
        </h2>
        {releaseYear && (
          <span className="mt-0.5 block text-xs text-secondary sm:text-sm">
            {releaseYear}
          </span>
        )}
        <p className="col-span-2 whitespace-pre-wrap wrap-anywhere text-sm leading-relaxed text-primary/90 line-clamp-3">
          {review}
        </p>
      </div>

      <footer className="col-span-2 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-neutral-200 pb-2.5 text-xs leading-relaxed text-secondary">
          {writtenDate && (
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineCalendarDays
                className="hidden size-4 shrink-0 md:block"
                aria-hidden="true"
              />
              <span>
                Written <time dateTime={createdAt}>{writtenDate}</time>
              </span>
            </span>
          )}
          {updatedDate && (
            <span className="inline-flex items-center gap-1.5">
              {writtenDate && (
                <span className="mr-0.5" aria-hidden="true">
                  ·
                </span>
              )}
              <HiOutlinePencil
                className="hidden size-4 shrink-0 md:block"
                aria-hidden="true"
              />
              <span>
                Updated <time dateTime={updatedAt}>{updatedDate}</time>
              </span>
            </span>
          )}
        </div>
        <Link
          to={`/movies/${movieId}/reviews`}
          className="group mt-2 inline-flex min-h-9 items-center gap-1 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={`View movie: ${movieInfo?.title || `movie ${movieId}`}`}
        >
          View movie
          <HiChevronRight
            className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </footer>
    </article>
  );
};

export default UserReviewCard;
