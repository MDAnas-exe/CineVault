import mongoose from "mongoose";

const userMovieSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: { type: Number, required: true },
    movieInfo: {
      title: { type: String, required: true },
      posterPath: String,
      releaseDate: String,
      genres: [String],
      popularity: Number,
    },
    watched: { type: Boolean, default: false },
    liked: { type: Boolean, default: false },
    inWatchlist: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userMovieSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("UserMovie", userMovieSchema);
