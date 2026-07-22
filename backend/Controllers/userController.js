import expressAsyncHandler from "express-async-handler";
import userMovieModel from "../models/userMovieModel.js";

const manageLikes = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { movieInfo = {} } = req.body || {};

  if (!id) {
    res.status(400);
    throw new Error("Incomplete Information!");
  }

  const { liked: initialLiked } = await userMovieModel.findOneAndUpdate(
    { userId: req.user._id, movieId: id },
    {
      $setOnInsert: {
        userId: req.user._id,
        movieId: id,
        movieInfo: { ...movieInfo },
      },
    },
    { upsert: true, returnDocument: "after" },
  );

  const { liked: finalLiked } = await userMovieModel.findOneAndUpdate(
    { userId: req.user.id, movieId: id },
    { $set: { liked: !initialLiked } },
    { returnDocument: "after" },
  );

  res.status(200).json({
    liked: finalLiked,
    message: finalLiked ? "Liked Movie" : "Unliked Movie",
  });
});

const manageWatched = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { movieInfo = {} } = req.body || {};

  if (!id) {
    res.status(400);
    throw new Error("Incomplete Information!");
  }

  const { watched: initialWatched } = await userMovieModel.findOneAndUpdate(
    { userId: req.user._id, movieId: id },
    {
      $setOnInsert: {
        userId: req.user._id,
        movieId: id,
        movieInfo: { ...movieInfo },
      },
    },
    { upsert: true, returnDocument: "after" },
  );

  const { watched: finalWatched } = await userMovieModel.findOneAndUpdate(
    { userId: req.user._id, movieId: id },
    { $set: { watched: !initialWatched } },
    { returnDocument: "after" },
  );

  res.status(200).json({
    watched: finalWatched,
    message: finalWatched ? "Marked as Watched" : "Marked as Unwatched",
  });
});

const manageWatchlist = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { movieInfo = {} } = req.body || {};

  if (!id) {
    res.status(400);
    throw new Error("Incomplete Information!");
  }

  const { inWatchlist: initialInWatchlist } = await userMovieModel.findOneAndUpdate(
    { userId: req.user._id, movieId: id },
    {
      $setOnInsert: {
        userId: req.user._id,
        movieId: id,
        movieInfo: { ...movieInfo },
      },
    },
    { upsert: true, returnDocument: "after" },
  );

  const { inWatchlist: finalInWatchlist } = await userMovieModel.findOneAndUpdate(
    { userId: req.user._id, movieId: id },
    { $set: { inWatchlist: !initialInWatchlist } },
    { returnDocument: "after" },
  );

  res.status(200).json({
    inWatchlist: finalInWatchlist,
    message: finalInWatchlist ? "Added to Watchlist" : "Removed from Watchlist",
  });
});

export { manageLikes, manageWatched, manageWatchlist };
