import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true },
);

reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
