import expressAsyncHandler from "express-async-handler";
import userMovieModel from "../models/userMovieModel.js";

const FIELD_MESSAGES = {
  liked: { onTrue: "Liked Movie", onFalse: "Unliked Movie" },
  watched: { onTrue: "Marked as Watched", onFalse: "Marked as Unwatched" },
  inWatchlist: { onTrue: "Added to Watchlist", onFalse: "Removed from Watchlist" },
};

const manageMovieState = (field) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { movieInfo = {} } = req.body || {};

    if (!id) {
      res.status(400);
      throw new Error("Incomplete Information!");
    }

    const existingDoc = await userMovieModel.findOne({ userId: req.user._id, movieId: id });

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
      const created = await userMovieModel.findOneAndUpdate(
        { userId: req.user._id, movieId: id },
        {
          $setOnInsert: { userId: req.user._id, movieId: id, movieInfo: { ...movieInfo } },
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
