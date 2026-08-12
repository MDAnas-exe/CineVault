import { FaStar, FaCalendarAlt, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdTrendingUp } from "react-icons/md";
import UserActionButton from "../../../components/ui/UserActionButton";
import UserBtnSection from "../../../components/ui/UserBtnSection";

const SearchResultMovieCard = ({ movie, ref, isLoading, isError }) => {
  const navigate = useNavigate();

  const {
    id,
    title,
    original_title,
    poster_path,
    release_date,
    original_language,
    genre_ids,
    vote_average,
    vote_count,
    popularity,
    overview,
    liked,
    watched,
    inWatchlist,
    isUserMovieStatusError,
    isUserMovieStatusLoading,
  } = movie;

  const buttons = [
    {
      iconKey: "like",
      endpoint: `users/likes/${id}`,
      isActive: liked,
    },
    {
      iconKey: "watchlist",
      endpoint: `users/watchlist/${id}`,
      isActive: inWatchlist,
    },
    {
      iconKey: "watched",
      endpoint: `users/watched/${id}`,
      isActive: watched,
    },
  ];

  const releaseDate = release_date
    ? new Date(release_date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "N/A";

  const language = original_language
    ? new Intl.DisplayNames(["en"], { type: "language" }).of(original_language)
    : "N/A";

  const votes = !vote_count
    ? "N/A"
    : vote_count >= 1000000
      ? `${(vote_count / 1000000).toFixed(1)}M votes`
      : vote_count >= 1000
        ? `${(vote_count / 1000).toFixed(1)}K votes`
        : `${vote_count} votes`;

  return (
    <div
      className="flex gap-2 sm:gap-6 p-2 sm:p-4 lg:p-6 rounded-2xl bg-white  font-inter border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer sm:flex-row  sm:w-full  "
      ref={ref}
      onClick={() => {
        navigate(`/movies/${id}`);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
        alt={title}
        className="size-40 sm:w-30 sm:h-40 lg:w-37.5 lg:h-50 rounded-xl self-center"
      />

      <div className="flex flex-col justify-between w-full gap-2 sm:gap-0">
        <div className="flex items-center justify-between  ">
          <h1 className="font-poppins font-bold text-lg lg:text-3xl text-primary  line-clamp-1 sm:line-clamp-2 ">
            {title || original_title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center sm:gap-2">
            <div className="flex items-center gap-1 text-accent font-bold text-lg">
              {vote_average ? (
                <>
                  <FaStar />
                  {vote_average.toFixed(2)}
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
          {overview ? overview : "N/A"}
        </p>

        <hr className=" border-gray-200" />

        <div className="flex  justify-between items-center ">
          <div className=" items-center gap-2 text-accent font-medium lg:text-base sm:text-sm text-xs hidden sm:flex">
            <MdTrendingUp />
            Popularity
            <span className="text-primary font-bold">
              {popularity ? popularity.toFixed(2) : "N/A"}
            </span>
          </div>

          <UserBtnSection
            variant="search"
            className={
              isUserMovieStatusLoading
                ? "flex gap-3 items-center"
                : isUserMovieStatusError
                  ? "flex items-center"
                  : "flex items-center w-full sm:w-auto sm:gap-3 justify-around lg:text-base sm:text-sm text-base"
            }
            isLoading={isUserMovieStatusLoading}
            isError={isUserMovieStatusError}
          >
            {buttons.map((btn, index) => (
              <UserActionButton
                key={index}
                title={title}
                id={id}
                popularity={popularity}
                releaseDate={release_date}
                posterPath={poster_path}
                genres={genre_ids}
                iconKey={btn.iconKey}
                endpoint={btn.endpoint}
                isActive={btn.isActive}
                className="w-7 h-7 lg:w-10 lg:h-10 rounded-full sm:border border-gray-200 bg-transparent hover:bg-transparent shadow-none text-primary/60 hover:text-accent focus:ring-0"
              />
            ))}
          </UserBtnSection>
        </div>
      </div>
    </div>
  );
};

export default SearchResultMovieCard;
