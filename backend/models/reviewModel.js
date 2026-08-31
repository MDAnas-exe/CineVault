import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    movieId: { type: Number, required: true },
    movieInfo: {
      title: { type: String, required: true, trim: true, maxlength: 200 },
      posterPath: { type: String, default: null },
      releaseDate: { type: Date, default: null },
    },
    review: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
