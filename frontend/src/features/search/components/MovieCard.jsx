import {
  FaStar,
  FaCalendarAlt,
  FaGlobe,
  FaRegBookmark,
  FaRegHeart,
  FaRegEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdTrendingUp } from "react-icons/md";
import MovieActionButton from "../../../components/ui/MovieActionButton";
const SearchResultMovieCard = ({ movie, ref }) => {
  const navigate = useNavigate();
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
      className="flex gap-2 sm:gap-6 p-2 sm:p-4 lg:p-6 rounded-2xl bg-white  font-inter border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer sm:flex-row  sm:w-full  "
      ref={ref}
      onClick={() => {
        navigate(`/movie/${movie.id}`);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        alt={movie.title}
        className="size-40 sm:w-30 sm:h-40 lg:w-37.5 lg:h-50 rounded-xl self-center"
      />

      <div className="flex flex-col justify-between w-full gap-2 sm:gap-0">
        <div className="flex items-center justify-between  ">
          <h1 className="font-poppins font-bold text-lg lg:text-3xl text-primary  line-clamp-1 sm:line-clamp-2 ">
            {movie.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center sm:gap-2">
            <div className="flex items-center gap-1 text-accent font-bold text-lg">
              {movie.vote_average ? (
                <>
                  <FaStar />
                  {movie.vote_average.toFixed(2)}
                </>
              ) : (
                "N/A"
              )}
            </div>
            <span className="text-primary/40 hidden sm:block">|</span>
            <span className="text-primary/60 hidden sm:block sm:text-sm lg:text-lg ">
              {votes}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 text-primary/60  text-xs sm:text-sm lg:text-base">
          <FaCalendarAlt /> {releaseDate}
          <span>•</span>
          <FaGlobe /> {language}
        </div>

        <p className="text-primary/80 text-xs sm:text-sm lg:text-base line-clamp-3 sm:line-clamp-2 lg:w-125 ">
          {movie.overview ? movie.overview : "N/A"}
        </p>

        <hr className=" border-gray-200" />

        <div className="flex  justify-between items-center ">
          <div className=" items-center gap-2 text-accent font-medium lg:text-base sm:text-sm text-xs hidden sm:flex">
            <MdTrendingUp />
            Popularity
            <span className="text-primary font-bold">
              {movie.popularity ? movie.popularity.toFixed(2) : "N/A"}
            </span>
          </div>

          <div className="flex items-center w-full sm:w-auto sm:gap-3 justify-around lg:text-base sm:text-sm text-base">
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

export default SearchResultMovieCard;
