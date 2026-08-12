import { useState } from "react";
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

const ICON_MAP = {
  like: { outline: FaRegHeart, solid: FaHeart },
  watchlist: { outline: FaRegBookmark, solid: FaBookmark },
  watched: { outline: FaRegEye, solid: FaEye },
};

const CrossFadeIcon = ({ iconKey, isActive, label }) => {
  const icons = ICON_MAP[iconKey];
  if (!icons) return null;
  const { outline: Outline, solid: Solid } = icons;
  return (
    <span className={`relative size-4 ${!label && "size-full"} `}>
      <Outline
        className={`absolute inset-0 transition-opacity duration-200 ${!label && "m-auto"}`}
        style={{ opacity: isActive ? 0 : 1 }}
      />
      <Solid
        className={`absolute inset-0 transition-opacity duration-200 ${!label && "m-auto"}`}
        style={{ opacity: isActive ? 1 : 0, color: "#D4A017" }}
      />
    </span>
  );
};

const messages = {
  like: {
    add: "Added to liked",
    remove: "Removed from liked",
    addError: "Failed to like",
    removeError: "Failed to unlike",
  },
  watchlist: {
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
  iconKey,
  label = "",
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
  const [isActive, setIsActive] = useState(initialIsActive);

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
    },
    onError: (err, variables, context) => {
      setIsActive(context.wasActive);
      toast.error(
        context.wasActive
          ? messages[iconKey].removeError
          : messages[iconKey].addError,
      );
    },
  });

  return (
    <Button
      type="button"
      className={twMerge(`flex items-center gap-2 `, className)}
      onClick={(e) => {
        e.stopPropagation();
        const wasActive = isActive;
        setIsActive((prev) => !prev);
        toast.success(
          wasActive ? messages[iconKey].remove : messages[iconKey].add,
        );
        mutateAsync({ endpoint, method: "PATCH", data: { movieInfo } });
      }}
    >
      <CrossFadeIcon iconKey={iconKey} isActive={isActive} label={label} />
      {label && <span>{label}</span>}
    </Button>
  );
};

export default UserActionButton;
