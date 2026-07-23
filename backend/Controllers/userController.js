import expressAsyncHandler from "express-async-handler";
import userMovieModel from "../models/userMovieModel.js";
import { GENRES } from "../constants/genres.js";
import { getCached, setCached, invalidateUserCache } from "../utils/mongoCache.js";

const FIELD_MESSAGES = {
  liked: { onTrue: "Liked Movie", onFalse: "Unliked Movie" },
  watched: { onTrue: "Marked as Watched", onFalse: "Marked as Unwatched" },
  inWatchlist: {
    onTrue: "Added to Watchlist",
    onFalse: "Removed from Watchlist",
  },
};

const manageMovieState = (field) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { movieInfo = {} } = req.body || {};

    const existingDoc = await userMovieModel
      .findOne({ userId: req.user._id, movieId: id })
      .select("liked watched inWatchlist");

    let finalValue;

    if (existingDoc) {
      const updated = await userMovieModel.findOneAndUpdate(
        { userId: req.user._id, movieId: id },
        { $set: { [field]: !existingDoc[field] } },
        { returnDocument: "after" },
      );
      finalValue = updated[field];
    } else {
      if (!movieInfo?.title) {
        res.status(400);
        throw new Error("Movie title is required");
      }

      const resolvedGenres = (movieInfo.genres ?? [])
        .map((id) => GENRES[id])
        .filter(Boolean);

      const created = await userMovieModel.findOneAndUpdate(
        { userId: req.user._id, movieId: id },
        {
          $setOnInsert: {
            userId: req.user._id,
            movieId: id,
            movieInfo: { ...movieInfo, genres: resolvedGenres },
          },
          $set: { [field]: true },
        },
        { upsert: true, returnDocument: "after" },
      );
      finalValue = created[field];
    }

    invalidateUserCache(req.user._id);

    const { onTrue, onFalse } = FIELD_MESSAGES[field];

    res.status(200).json({
      [field]: finalValue,
      message: finalValue ? onTrue : onFalse,
    });
  });

const manageLikes = manageMovieState("liked");
const manageWatched = manageMovieState("watched");
const manageWatchlist = manageMovieState("inWatchlist");

export { manageLikes, manageWatched, manageWatchlist };

const getUserMovies = (field, buildExtraFilter = () => ({})) =>
  expressAsyncHandler(async (req, res) => {
    const cacheKey = `user:${req.user._id}:${field}:${req.originalUrl}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    let {
      genres = "",
      fromYear = "",
      toYear = "",
      sortBy = "title",
      order = "asc",
      page = 1,
    } = req.query;

    page = parseInt(page);
    const limit = 20;

    const filter = {
      userId: req.user._id,
      [field]: true,
      ...buildExtraFilter(req.query),
    };

    if (genres) {
      genres = genres.split(",");
      genres = genres
        .map((genre, i) => {
          if (i < 3) return GENRES[genre];
        })
        .filter((genre) => genre);
      filter["movieInfo.genres"] = { $all: genres };
    }

    if (toYear)
      filter["movieInfo.releaseDate"] = { $lte: new Date(`${toYear}-12-31`) };

    if (fromYear)
      filter["movieInfo.releaseDate"] = {
        ...filter["movieInfo.releaseDate"],
        $gte: new Date(fromYear),
      };

    sortBy = sortBy === "dateAdded" ? "createdAt" : `movieInfo.${sortBy}`;

    const [results, totalResults] = await Promise.all([
      userMovieModel
        .find(filter)
        .select("movieId movieInfo.title liked watched inWatchlist -_id")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 }),
      userMovieModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalResults / limit);

    const movies = results.map((result) => ({
      title: result.movieInfo.title,
      movieId: result.movieId,
      liked: result.liked,
      watched: result.watched,
      watchlist: result.inWatchlist,
    }));

    const responseData = { movies, page, totalPages, totalResults };
    setCached(cacheKey, responseData);
    res.json(responseData);
  });

const getLiked = getUserMovies("liked");
const getWatched = getUserMovies("watched", ({ liked }) => {
  if (liked === "true") return { liked: true };
  if (liked === "false") return { liked: false };
  return {};
});
const getWatchlist = getUserMovies("inWatchlist");

export { getLiked, getWatched, getWatchlist };
