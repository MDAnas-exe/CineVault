import expressAsyncHandler from "express-async-handler";
import userMovieModel from "../models/userMovieModel.js";
import reviewModel from "../models/reviewModel.js";
import { GENRES } from "../constants/genres.js";

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
      .select("liked watched inWatchlist")
      .lean();

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
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .lean(),
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

const getUserMovieStatus = expressAsyncHandler(async (req, res) => {
  let { ids } = req.query;

  ids = ids.split(",").map((id) => Number(id));

  let results = await userMovieModel
    .find({ userId: req.user._id, movieId: { $in: ids } })
    .select("inWatchlist watched liked movieId -_id")
    .lean();

  let map = new Map(results.map((result) => [result.movieId, result]));

  results = ids.map(
    (id) =>
      map.get(id) || {
        movieId: id,
        liked: false,
        watched: false,
        inWatchlist: false,
      },
  );

  res.status(200).json(results);
});

const getUserMe = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isVerified: req.user.isVerified,
  });
});

export { getUserMovieStatus, getUserMe };

const getUserProfile = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [
    likedCount,
    watchedCount,
    watchlistCount,
    reviewCount,
    recentLiked,
    recentWatched,
    recentWatchlist,
    recentReviews,
  ] = await Promise.all([
    userMovieModel.countDocuments({ userId, liked: true }),
    userMovieModel.countDocuments({ userId, watched: true }),
    userMovieModel.countDocuments({ userId, inWatchlist: true }),
    reviewModel.countDocuments({ userId }),
    userMovieModel
      .find({ userId, liked: true })
      .select("movieId movieInfo.title -_id")
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean(),
    userMovieModel
      .find({ userId, watched: true })
      .select("movieId movieInfo.title -_id")
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean(),
    userMovieModel
      .find({ userId, inWatchlist: true })
      .select("movieId movieInfo.title -_id")
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean(),
    reviewModel
      .find({ userId })
      .select("movieId movieTitle review createdAt -_id")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),
  ]);

  res.status(200).json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isVerified: req.user.isVerified,
      createdAt: req.user.createdAt,
    },
    stats: {
      likedCount,
      watchedCount,
      watchlistCount,
      reviewCount,
    },
    recent: {
      liked: recentLiked.map((item) => ({
        movieId: item.movieId,
        title: item.movieInfo?.title,
      })),
      watched: recentWatched.map((item) => ({
        movieId: item.movieId,
        title: item.movieInfo?.title,
      })),
      watchlist: recentWatchlist.map((item) => ({
        movieId: item.movieId,
        title: item.movieInfo?.title,
      })),
      reviews: recentReviews.map((item) => ({
        movieId: item.movieId,
        movieTitle: item.movieTitle,
        review: item.review,
        createdAt: item.createdAt,
      })),
    },
  });
});

const manageReview = expressAsyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const { review, movieTitle } = req.body;

  const updatedReview = await reviewModel
    .findOneAndUpdate(
      { userId: req.user._id, movieId: Number(movieId) },
      {
        userId: req.user._id,
        name: req.user.name,
        movieId: Number(movieId),
        movieTitle,
        review,
      },
      { upsert: true, returnDocument: "after" },
    )
    .select("movieId movieTitle review name createdAt updatedAt -_id")
    .lean();

  res.status(200).json({
    review: updatedReview,
    message: "Review saved successfully",
  });
});

const deleteReview = expressAsyncHandler(async (req, res) => {
  const { movieId } = req.params;

  const deleted = await reviewModel.findOneAndDelete({
    userId: req.user._id,
    movieId: Number(movieId),
  });

  if (!deleted) {
    res.status(404);
    throw new Error("Review not found");
  }

  res.status(200).json({ message: "Review deleted successfully" });
});

const getUserReviews = expressAsyncHandler(async (req, res) => {
  const { page = 1 } = req.query;
  const pageNum = parseInt(page);
  const limit = 10;

  const [reviews, totalResults] = await Promise.all([
    reviewModel
      .find({ userId: req.user._id })
      .select("movieId movieTitle review name createdAt updatedAt -_id")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((pageNum - 1) * limit)
      .lean(),
    reviewModel.countDocuments({ userId: req.user._id }),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  res.status(200).json({
    reviews,
    page: pageNum,
    totalPages,
    totalResults,
  });
});

export { getUserProfile, manageReview, deleteReview, getUserReviews };
