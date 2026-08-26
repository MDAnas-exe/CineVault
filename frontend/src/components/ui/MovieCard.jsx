import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import UserActionButton from "./UserActionButton";
import { getUserMovieActions } from "../../constants/userMovie";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${TMDB_IMAGE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
};

const MovieCard = ({
  movie,
  index,
  className = "",
  showActions = true,
  ...rest
}) => {
  const navigate = useNavigate();

  const {
    id,
    title = "Untitled",
    posterPath,
    releaseDate,
    genres,
    popularity,
    liked,
    watched,
    watchlisted,
  } = movie;
  const posterUrl = getImageUrl(posterPath);
  const buttons = getUserMovieActions(id, { liked, watched, watchlisted });

  return (
    <div className="flex gap-0.5">
      {index !== undefined && (
        <p
          className="text-3xl text-transparent text-stroke-2 text-stroke-accent lg:text-6xl"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #d4a017",
          }}
        >
          {index + 1}
        </p>
      )}

      <div
        style={
          posterUrl
            ? { backgroundImage: `url(${posterUrl})` }
            : {
                backgroundImage:
                  "linear-gradient(135deg, #111827 0%, #3f3f46 100%)",
              }
        }
        onClick={() => navigate(`/movies/${id}`)}
        className={twMerge(
          "group relative h-32 w-18 xs:w-22 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-cover bg-center shadow-sm transition-shadow duration-300 hover:shadow-lg sm:h-56 sm:w-36",
          className,
        )}
        {...rest}
      >
        <div className="absolute inset-x-0 bottom-0 sm:flex translate-y-2 flex-col gap-2 bg-linear-to-t from-black/95 via-black/75 to-transparent px-2 pb-2 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden ">
          {showActions && (
            <div className="flex items-center justify-center gap-2">
              {buttons.map((btn) => (
                <UserActionButton
                  key={btn.status}
                  {...btn}
                  id={id}
                  title={title}
                  posterPath={posterPath}
                  releaseDate={releaseDate}
                  genres={genres}
                  popularity={popularity}
                  className="size-8 justify-center rounded-full border border-white/25 bg-black/30 p-0 text-white shadow-none hover:bg-white/15 hover:text-accent focus:ring-0"
                />
              ))}
            </div>
          )}

          <p className="line-clamp-2 text-center font-poppins text-xs font-semibold text-white">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
