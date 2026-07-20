import mongoose from "mongoose";

const userMovieSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: Number, required: true }, // TMDB id
    movieInfo: {
      title: String,
      posterPath: String,
    },
    watched: { type: Boolean, default: false },
    liked: { type: Boolean, default: false },
    inWatchlist: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userMovieSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model("UserMovie", userMovieSchema);
