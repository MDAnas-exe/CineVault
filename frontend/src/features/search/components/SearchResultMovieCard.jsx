import React from "react";
import {
  FaStar,
  FaCalendarAlt,
  FaGlobe,
  FaRegBookmark,
  FaRegHeart,
  FaRegEye,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import MovieActionButton from "../../../components/ui/MovieActionButton";
const MovieDetail = ({ movie }) => {
  const iconMap = {
    FaRegHeart,
    FaRegBookmark,
    FaRegEye,
  };
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "N/A";

  const language = movie.original_language
    ? new Intl.DisplayNames(["en"], { type: "language" }).of(
        movie.original_language,
      )
    : "N/A";

  const votes = !movie.vote_count
    ? "N/A"
    : movie.vote_count >= 1000000
      ? `${(movie.vote_count / 1000000).toFixed(1)}M votes`
      : movie.vote_count >= 1000
        ? `${(movie.vote_count / 1000).toFixed(1)}K votes`
        : `${movie.vote_count} votes`;

  return (
    <div
      className="flex w-4/5 gap-6 p-6 rounded-2xl bg-white  font-inter border border-gray-200/60
      shadow-sm  hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        alt={movie.title}
        className="w-37.5 h-50 rounded-xl "
      />

      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center gap-4">
          <h1 className="font-poppins font-bold text-3xl text-primary">
            {movie.title}
          </h1>
          <div className="flex items-center gap-1 text-accent font-bold text-xl">
            {movie.vote_average ? (
              <>
                <FaStar />
                {movie.vote_average.toFixed(2)}
              </>
            ) : (
              "N/A"
            )}
          </div>
          <span className="text-primary/40">|</span>
          <span className="text-primary/60">{votes}</span>
        </div>

        <div className="flex items-center gap-2 text-primary/60 ">
          <FaCalendarAlt /> {releaseDate}
          <span>•</span>
          <FaGlobe /> {language}
        </div>

        <p className="text-primary/80  line-clamp-2 w-125 ">
          {movie.overview ? movie.overview : "N/A"}
        </p>

        <hr className=" border-gray-200" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-accent font-medium">
            <MdTrendingUp />
            Popularity
            <span className="text-primary font-bold">
              {movie.popularity ? movie.popularity.toFixed(2) : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: "FaRegHeart", title: "Add to liked" },
              { icon: "FaRegBookmark", title: "Add to Watchlist" },
              { icon: "FaRegEye", title: "Mark as Watched" },
            ].map((btn, index) => {
              const Icon = iconMap[btn.icon];
              return (
                <MovieActionButton
                  icon={<Icon />}
                  title={btn.title}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
