import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegEye,
  FaEye,
} from "react-icons/fa";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest.js";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";

const ICON_MAP = {
  liked: { outline: FaRegHeart, solid: FaHeart },
  watchlisted: { outline: FaRegBookmark, solid: FaBookmark },
  watched: { outline: FaRegEye, solid: FaEye },
};

const CrossFadeIcon = ({ status, isActive, label }) => {
  const icons = ICON_MAP[status];
  if (!icons) return null;
  const { outline: Outline, solid: Solid } = icons;
  return (
    <span
      className={twMerge(
        "relative grid place-items-center",
        label ? "size-3 lg:size-4" : "size-full",
      )}
    >
      <Outline
        className="absolute transition-opacity duration-200"
        style={{ opacity: isActive ? 0 : 1 }}
      />
      <Solid
        className="absolute transition-opacity duration-200"
        style={{ opacity: isActive ? 1 : 0, color: "#D4A017" }}
      />
    </span>
  );
};

const messages = {
  liked: {
    add: "Added to liked",
    remove: "Removed from liked",
    addError: "Failed to like",
    removeError: "Failed to unlike",
  },
  watchlisted: {
    add: "Added to watchlist",
    remove: "Removed from watchlist",
    addError: "Failed to add to watchlist",
    removeError: "Failed to remove from watchlist",
  },
  watched: {
    add: "Marked as watched",
    remove: "Unmarked as watched",
    addError: "Failed to mark as watched",
    removeError: "Failed to unmark as watched",
  },
};

const UserActionButton = ({
  status,
  label = false,
  title,
  posterPath,
  releaseDate,
  genres,
  popularity,
  className = "",
  id,
  endpoint,
  isActive: initialIsActive,
}) => {
  const queryClient = useQueryClient();

  const { isLoggedIn } = useAuth();

  const [isActive, setIsActive] = useState(initialIsActive);

  const btnLabel = {
    watchlisted: isActive ? "Remove from Watchlist" : "Add to Watchlist",
    watched: isActive ? "Mark as Unwatched" : "Mark as Watched",
    liked: isActive ? "Unlike" : "Like",
  };

  const controllerRef = useRef(null);

  const movieInfo = {};

  movieInfo.title = title;

  if (posterPath) movieInfo.posterPath = posterPath;

  if (releaseDate) movieInfo.releaseDate = new Date(releaseDate);

  if (genres) movieInfo.genres = genres;

  if (popularity) movieInfo.popularity = popularity.toFixed(2);

  const { mutateAsync } = useMutation({
    mutationFn: apiRequest,
    onMutate: () => ({ wasActive: isActive }),
    onSuccess: () => {
      queryClient.setQueryData(["movie-status", id], null);
      queryClient.invalidateQueries({ queryKey: ["movie-status", id] });
      queryClient.invalidateQueries({ queryKey: ["user-movies"] });
    },
    onError: (err, variables, context) => {
      if (err.name === "AbortError") return;
      setIsActive(context.wasActive);
      toast.error(
        context.wasActive
          ? messages[status].removeError
          : messages[status].addError,
      );
    },
  });

  const handleClick = async (e) => {
    e.stopPropagation();

    if (!isLoggedIn) return toast.error("login required");

    const wasActive = isActive;

    setIsActive((prev) => !prev);

    toast.success(wasActive ? messages[status].remove : messages[status].add);

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    await mutateAsync({
      endpoint,
      method: "PATCH",
      data: { movieInfo },
      signal: controllerRef.current.signal,
    });
  };

  return (
    <Button
      type="button"
      className={twMerge(`flex items-center md:gap-2 `, className)}
      onClick={handleClick}
    >
      <CrossFadeIcon status={status} isActive={isActive} label={label} />
      {label && <span>{btnLabel[status]}</span>}
    </Button>
  );
};

export default UserActionButton;
