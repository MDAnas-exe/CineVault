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
      releaseDate: Date,
      genres: [String],
      popularity: Number,
    },
    watched: { type: Boolean, default: false },
    watchedAt: { type: Date, default: null },
    liked: { type: Boolean, default: false },
    likedAt: { type: Date, default: null },
    watchlisted: { type: Boolean, default: false },
    watchlistedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

userMovieSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("UserMovie", userMovieSchema);
