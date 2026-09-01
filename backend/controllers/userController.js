import expressAsyncHandler from "express-async-handler";
import userMovieModel from "../models/userMovieModel.js";
import reviewModel from "../models/reviewModel.js";
import { GENRES } from "../constants/genres.js";

const FIELD_MESSAGES = {
  liked: { onTrue: "Liked Movie", onFalse: "Unliked Movie" },
  watched: { onTrue: "Marked as Watched", onFalse: "Marked as Unwatched" },
  watchlisted: {
    onTrue: "Added to Watchlist",
    onFalse: "Removed from Watchlist",
  },
};

const fieldTimestamps = {
  liked: "likedAt",
  watched: "watchedAt",
  watchlisted: "watchlistedAt",
};

const manageMovieStatus = (field) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { value, movieInfo = {} } = req.body;

    const existingDoc = await userMovieModel
      .findOne({ userId: req.user._id, movieId: id })
      .select("liked watched watchlisted")
      .lean();

    const fieldTimestamp = fieldTimestamps[field];
    let finalValue = value;

    if (existingDoc && existingDoc[field] !== value) {
      const updatedDoc = await userMovieModel.findOneAndUpdate(
        { userId: req.user._id, movieId: id },
        {
          $set: {
            [field]: value,
            [fieldTimestamp]: value ? new Date() : null,
          },
        },
        { returnDocument: "after" },
      );

      finalValue = updatedDoc[field];
    } else if (!existingDoc && value) {
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
          $set: {
            userId: req.user._id,
            movieId: id,
            movieInfo: { ...movieInfo, genres: resolvedGenres },
            [fieldTimestamp]: new Date(),
            [field]: value,
          },
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

const manageLiked = manageMovieStatus("liked");
const manageWatched = manageMovieStatus("watched");
const manageWatchlisted = manageMovieStatus("watchlisted");

export { manageLiked, manageWatched, manageWatchlisted };

const getUserMovies = (field, buildExtraFilter = () => ({})) =>
  expressAsyncHandler(async (req, res) => {
    let {
      genres = "",
      fromYear = "",
      toYear = "",
      sortBy = "title",
      order = "asc",
      page = 1,
      limit,
    } = req.query;

    page = parseInt(page);

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

    sortBy =
      sortBy === "dateAdded" ? fieldTimestamps[field] : `movieInfo.${sortBy}`;

    const [results, totalResults] = await Promise.all([
      userMovieModel
        .find(filter)
        .select(
          "movieId movieInfo.title movieInfo.posterPath liked watched watchlisted -_id",
        )
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
      posterPath: result.movieInfo.posterPath,
      liked: result.liked,
      watched: result.watched,
      watchlisted: result.watchlisted,
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
const getWatchlisted = getUserMovies("watchlisted");

export { getLiked, getWatched, getWatchlisted };

const getUserMovieStatus = expressAsyncHandler(async (req, res) => {
  let { ids } = req.query;

  ids = ids.split(",").map((id) => Number(id));

  let results = await userMovieModel
    .find({ userId: req.user._id, movieId: { $in: ids } })
    .select("watchlisted watched liked movieId -_id")
    .lean();

  let map = new Map(results.map((result) => [result.movieId, result]));

  results = ids.map(
    (id) =>
      map.get(id) || {
        movieId: id,
        liked: false,
        watched: false,
        watchlisted: false,
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

  const [likedCount, watchedCount, watchlistedCount, reviewCount] =
    await Promise.all([
      userMovieModel.countDocuments({ userId, liked: true }),
      userMovieModel.countDocuments({ userId, watched: true }),
      userMovieModel.countDocuments({ userId, watchlisted: true }),
      reviewModel.countDocuments({ userId }),
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
      watchlistedCount,
      reviewCount,
    },
  });
});

const manageReview = expressAsyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const { review, movieInfo } = req.body;

  const updatedReview = await reviewModel
    .findOneAndUpdate(
      { userId: req.user._id, movieId: Number(movieId) },
      {
        userId: req.user._id,
        name: req.user.name,
        movieId: Number(movieId),
        movieInfo: {
          title: movieInfo.title,
          posterPath: movieInfo.posterPath ?? null,
          releaseDate: movieInfo.releaseDate ?? null,
        },
        review,
      },
      { upsert: true, returnDocument: "after", runValidators: true },
    )
    .select("movieId movieInfo review name createdAt updatedAt -_id")
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
  const {
    page = 1,
    sortBy = "createdAt",
    order = "desc",
    fromDate,
    toDate,
  } = req.query;
  const pageNum = parseInt(page);
  const limit = 10;
  const filter = { userId: req.user._id };

  if (fromDate || toDate) {
    filter.createdAt = {};

    if (fromDate) filter.createdAt.$gte = new Date(fromDate);
    if (toDate) filter.createdAt.$lte = new Date(`${toDate}T23:59:59.999Z`);
  }

  const [reviews, totalResults] = await Promise.all([
    reviewModel
      .find(filter)
      .select("movieId movieInfo review name createdAt updatedAt -_id")
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .limit(limit)
      .skip((pageNum - 1) * limit)
      .lean(),
    reviewModel.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  res.status(200).json({
    reviews,
    page: pageNum,
    totalPages,
    totalResults,
  });
});

const getUserReviewForMovie = expressAsyncHandler(async (req, res) => {
  const { movieId } = req.params;

  const review = await reviewModel
    .findOne({ userId: req.user._id, movieId: Number(movieId) })
    .select("movieId movieInfo review name createdAt updatedAt -_id")
    .lean();

  if (!review) {
    res.status(404);
    throw new Error("No review found for this movie");
  }

  res.status(200).json({ review });
});

export {
  getUserProfile,
  manageReview,
  deleteReview,
  getUserReviews,
  getUserReviewForMovie,
};
