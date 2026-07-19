import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add name"] },
    password: { type: String, required: [true, "Please add password"] },
    email: { type: String, required: [true, "Please add email"], unique: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.index(
  { createdAt: 1 },
  {
    expiresAfterSeconds: 86400,
    partialFilterExpression: { isVerified: false },
  },
);

export default mongoose.model("user", userSchema);
